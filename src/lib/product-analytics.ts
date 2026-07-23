export type ProductEvent = "page_view" | "quiz_complete" | "topic_complete" | "diagnostic_complete" | "plan_created" | "search_used" | "tutor_used";

export function trackProductEvent(eventName: ProductEvent, eventKey = "") {
  if (typeof window === "undefined" || navigator.doNotTrack === "1") return;
  fetch("/api/analytics", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ eventName, eventKey }),
    keepalive: true,
  }).catch(() => undefined);
}
