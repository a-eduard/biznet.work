import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = (props: P) => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
  "aria-hidden": true,
  ...props,
});

export const IconArrow = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);
export const IconArrowDown = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 4v15M6 13l6 6 6-6" />
  </svg>
);
export const IconChat = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 5h16v11H9l-5 4V5z" />
    <path d="M8 9h8M8 12h5" />
  </svg>
);
export const IconTicket = (p: P) => (
  <svg {...base(p)}>
    <rect x="4" y="4" width="16" height="16" />
    <path d="M8 9l2 2 4-4M8 15h8" />
  </svg>
);
export const IconBranch = (p: P) => (
  <svg {...base(p)}>
    <circle cx="7" cy="5.5" r="2" />
    <circle cx="7" cy="18.5" r="2" />
    <circle cx="17" cy="8.5" r="2" />
    <path d="M7 7.5v9M17 10.5c0 4-10 2-10 6" />
  </svg>
);
export const IconVideo = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="6" width="13" height="12" />
    <path d="M16 10l5-3v10l-5-3" />
  </svg>
);
export const IconShield = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
    <path d="M8.5 12l2.5 2.5 4.5-5" />
  </svg>
);
export const IconLock = (p: P) => (
  <svg {...base(p)}>
    <rect x="5" y="10" width="14" height="10" />
    <path d="M8 10V7a4 4 0 018 0v3" />
  </svg>
);
export const IconGraph = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="6" height="5" />
    <rect x="15" y="9.5" width="6" height="5" />
    <rect x="3" y="16" width="6" height="5" />
    <path d="M9 5.5h3v6.5h3M9 18.5h3V12" />
  </svg>
);
export const IconStream = (p: P) => (
  <svg {...base(p)}>
    <path d="M3 7h12M3 12h18M3 17h9" />
    <path d="M18 4l3 3-3 3" />
  </svg>
);
export const IconCoin = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M14.5 9.2c-.6-.8-1.5-1.2-2.6-1.2-1.6 0-2.7.8-2.7 2s1.1 1.7 2.7 2c1.7.3 2.8.9 2.8 2.1S13.6 16 12 16c-1.2 0-2.2-.5-2.8-1.3M12 6.5V8M12 16v1.5" />
  </svg>
);
export const IconPlug = (p: P) => (
  <svg {...base(p)}>
    <path d="M9 3v5M15 3v5M6 8h12v4a6 6 0 01-12 0V8zM12 18v3" />
  </svg>
);
export const IconPulse = (p: P) => (
  <svg {...base(p)}>
    <path d="M3 12h4l2-6 4 12 2-6h6" />
  </svg>
);
export const IconEye = (p: P) => (
  <svg {...base(p)}>
    <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
export const IconLayers = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3l9 5-9 5-9-5 9-5z" />
    <path d="M3 13l9 5 9-5" />
  </svg>
);
export const IconCheck = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);
export const IconX = (p: P) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
export const IconClock = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7v5l3 2" />
  </svg>
);
export const IconMenu = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);
