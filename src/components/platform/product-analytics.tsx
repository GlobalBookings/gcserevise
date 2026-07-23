"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackProductEvent } from "@/lib/product-analytics";

export function ProductAnalytics() {
  const pathname = usePathname();
  useEffect(() => {
    trackProductEvent("page_view", pathname);
  }, [pathname]);
  return null;
}
