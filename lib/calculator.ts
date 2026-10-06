/**
 * Earnings calculator — ROUGH ESTIMATE, not a promise.
 *
 * Anchored to the client's own example (30 PRODUCTION / master_prompt.txt, "for a very small business"):
 *   one company's data stream is sold to 5 AI labs × $2,000/month = $10,000/month,
 *   the company receives 20% → $2,000/month.
 * Share range 5–30% comes from the docs: patchy data (chats only) ≈ 5%, a full "golden trace"
 * (call → task → code/result) up to 25–30%. Niche matters: deep-tech data sells for more than
 * a local agency's.
 *
 * Everything below is an assumption you can tune in one place.
 */

/** Team size of the "very small business" in the docs example (assumption). */
const ANCHOR_TEAM = 10;
/** Monthly sales of that example company's data, all buyers together ($). */
const ANCHOR_SALES = 10_000;
/** Bigger teams produce more data, but not proportionally more value. */
const SCALE_EXPONENT = 0.8;
/** Shown as a range around the point estimate. */
export const RANGE = { low: 0.6, high: 1.4 };

export const tools = [
  { id: "chat", label: "Work chat", hint: "e.g. Slack" },
  { id: "tasks", label: "Task board", hint: "e.g. Jira" },
  { id: "calls", label: "Video calls", hint: "e.g. Google Meet" },
  { id: "code", label: "Code", hint: "e.g. GitHub" },
] as const;
export type ToolId = (typeof tools)[number]["id"];

/** Your share of every sale by number of connected tools: the more complete the picture, the higher. */
const SHARE_BY_TOOLS = [0, 0.05, 0.12, 0.2, 0.28];

export const niches = [
  { id: "local", label: "Local service or shop", multiplier: 0.5 },
  { id: "office", label: "Office or agency", multiplier: 1 },
  { id: "tech", label: "Tech or R&D", multiplier: 1.6 },
] as const;
export type NicheId = (typeof niches)[number]["id"];

export const TEAM_MIN = 20;
export const TEAM_MAX = 250;

export function shareFor(toolCount: number) {
  return SHARE_BY_TOOLS[Math.max(0, Math.min(toolCount, SHARE_BY_TOOLS.length - 1))];
}

export function estimate(team: number, toolCount: number, niche: NicheId) {
  const m = niches.find((n) => n.id === niche)?.multiplier ?? 1;
  const sales = ANCHOR_SALES * Math.pow(team / ANCHOR_TEAM, SCALE_EXPONENT) * m;
  const share = shareFor(toolCount);
  const monthly = sales * share;
  const rounded = roundMoney(monthly);
  return {
    share,
    monthly: rounded,
    yearly: rounded * 12,
    low: roundMoney(monthly * RANGE.low),
    high: roundMoney(monthly * RANGE.high),
  };
}

function roundMoney(v: number) {
  const step = v < 1_000 ? 10 : v < 10_000 ? 50 : 100;
  return Math.round(v / step) * step;
}

export const money = (v: number) => `$${v.toLocaleString("en-US")}`;
