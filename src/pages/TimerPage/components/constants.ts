export const TIMER_COLORS = {
	work: {
		primary: "#e45858",
		secondary: "#f6b2b2",
		accent: "#c93636",
		background: "#fff1f1",
		text: "#7f1d1d",
	},
	shortBreak: {
		primary: "#43a675",
		secondary: "#a9dfc2",
		accent: "#258257",
		background: "#effbf4",
		text: "#14532d",
	},
	longBreak: {
		primary: "#4f83cc",
		secondary: "#b3ccef",
		accent: "#3268ad",
		background: "#eff6ff",
		text: "#1e3a8a",
	},
	stop: {
		primary: "#6b7280",
		secondary: "#d1d5db",
		accent: "#4b5563",
		background: "#f3f4f6",
		text: "#1f2937",
	},
} as const;

export const MODE_LABELS = {
	work: "Working",
	shortBreak: "Short break",
	longBreak: "Long break",
} as const;
