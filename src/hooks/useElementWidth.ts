import { useEffect, useRef, useState } from "react";

/**
 * A custom React hook that returns a ref and the width of the referenced element.
 * It uses the ResizeObserver API to monitor changes in the element's width.
 *
 * @template T - The type of the HTML element being referenced.
 * @returns A tuple containing the ref and the current width of the element.
 * @example
 * const [ref, width] = useElementWidth<HTMLDivElement>();
 * return <div ref={ref}>Current width: {width}px</div>;
 */
export function useElementWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return [ref, width] as const;
}
