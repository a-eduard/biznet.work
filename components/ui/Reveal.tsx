"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { useInView } from "@/lib/hooks";

type Props = {
  children: ReactNode;
  as?: "div" | "li" | "article" | "section" | "span" | "p";
  delay?: number;
  className?: string;
  variant?: "up" | "fade" | "left" | "scale";
  style?: CSSProperties;
  id?: string;
};

/** Fades/slides its content in the first time it scrolls into view. */
export function Reveal({ children, as = "div", delay = 0, className = "", variant = "up", style, id }: Props) {
  // Cast keeps the JSX typing simple; every allowed tag is a plain block/inline element.
  const Tag = as as "div";
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal reveal--${variant} ${inView ? "is-in" : ""} ${className}`}
      style={{ ...style, transitionDelay: `${delay}s` }}
    >
      {children}
    </Tag>
  );
}
