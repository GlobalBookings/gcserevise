import type { User } from "@supabase/supabase-js";

export function hasEditorAccess(user: User | null) {
  return Boolean(user?.app_metadata?.role === "editor");
}
