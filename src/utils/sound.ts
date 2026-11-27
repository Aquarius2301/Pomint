let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  ctx ??= new AudioContext();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

const clamp = (v: number): number => Math.min(1, Math.max(0, v));
const MIN_GAIN = 0.0001; // exponentialRamp does not allow 0

/**
 * The click sound in a short duration
 * @param volume - volume of the click sound, range from 0 to 1
 */
export function playClick(volume = 0.5): void {
  const ac = getCtx();
  const t = ac.currentTime;
  const v = Math.max(clamp(volume), MIN_GAIN);

  const osc = ac.createOscillator();
  const gain = ac.createGain();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(1200, t);
  osc.frequency.exponentialRampToValueAtTime(400, t + 0.05);

  gain.gain.setValueAtTime(MIN_GAIN, t);
  gain.gain.exponentialRampToValueAtTime(v, t + 0.003);
  gain.gain.exponentialRampToValueAtTime(MIN_GAIN, t + 0.06);

  osc.connect(gain).connect(ac.destination);
  osc.start(t);
  osc.stop(t + 0.07);
}

let stopCurrentAlert: (() => void) | null = null;

/**
 * Play a long alert sound with a specified volume and duration.
 * @param volume - The volume of the alert sound, ranging from 0 to 1. Default is 0.5.
 * @param duration - The duration of the alert sound in seconds. Default is 5 seconds.
 * @returns A function that can be called to stop the alert sound.
 */
export function playLongAlert(volume = 0.5, duration = 5): () => void {
  stopCurrentAlert?.(); // stop any previous alert sound

  const ac = getCtx();
  const t0 = ac.currentTime;
  const v = clamp(volume);

  const master = ac.createGain();
  master.gain.setValueAtTime(v, t0);
  master.gain.setValueAtTime(v, t0 + duration - 0.5);
  master.gain.linearRampToValueAtTime(0, t0 + duration); // fade out
  master.connect(ac.destination);

  const notes = [880, 1318.5]; // A5, E6
  const step = 0.5;
  const oscillators: OscillatorNode[] = [];

  for (let i = 0; i * step < duration; i++) {
    const start = t0 + i * step;
    const osc = ac.createOscillator();
    const gain = ac.createGain();

    osc.type = "sine";
    osc.frequency.value = notes[i % notes.length];

    gain.gain.setValueAtTime(MIN_GAIN, start);
    gain.gain.exponentialRampToValueAtTime(0.6, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(MIN_GAIN, start + step * 0.95);

    osc.connect(gain).connect(master);
    osc.start(start);
    osc.stop(start + step);
    oscillators.push(osc);
  }

  const stop = (): void => {
    oscillators.forEach((o) => o.stop());
    master.disconnect();
    if (stopCurrentAlert === stop) stopCurrentAlert = null;
  };

  oscillators[oscillators.length - 1].onended = stop;
  stopCurrentAlert = stop;
  return stop;
}
