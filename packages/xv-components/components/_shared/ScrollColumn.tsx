import { useRef, useEffect } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

interface ScrollColumnProps {
  items: number[];
  selected: number;
  onSelect: (value: number) => void;
  format?: (n: number) => string;
}

export const ScrollColumn = ({
  items,
  selected,
  onSelect,
  format = pad,
}: ScrollColumnProps) => {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const index = items.indexOf(selected);
    if (ref.current && index !== -1) {
      const item = ref.current.children[index] as HTMLElement;
      item?.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [selected, items]);

  return (
    <ul ref={ref} className="xv-time-picker__column">
      {items.map((item) => (
        <li
          key={item}
          className={`xv-time-picker__column-item${item === selected ? " xv-time-picker__column-item--selected" : ""}`}
          onClick={() => onSelect(item)}
        >
          {format(item)}
        </li>
      ))}
    </ul>
  );
};

ScrollColumn.displayName = "ScrollColumn";