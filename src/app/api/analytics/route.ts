import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const allowedEvents = new Set(["page_view", "quiz_complete", "topic_complete", "diagnostic_complete", "plan_created", "search_used", "tutor_used"]);

export async function POST(request: Request) {
  let body: { eventName?: string; eventKey?: string };
  try { body = await request.json(); } catch { return new NextResponse(null, { status: 204 }); }
  const eventName = body.eventName || "";
  const eventKey = (body.eventKey || "").slice(0, 120);
  if (!allowedEvents.has(eventName) || !/^[a-zA-Z0-9_:/-]*$/.test(eventKey)) return new NextResponse(null, { status: 204 });
  const supabase = await createClient();
  const { error } = await supabase.rpc("track_product_event", { requested_name: eventName, requested_key: eventKey });
  if (error) console.info(JSON.stringify({ type: "product_event", eventName, eventKey, date: new Date().toISOString().slice(0, 10) }));
  return new NextResponse(null, { status: 204 });
}
