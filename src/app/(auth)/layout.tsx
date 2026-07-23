import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account & Progress",
  description: "Sign in to GCSERevise to sync revision progress securely across devices.",
  robots: { index: false, follow: false, nocache: true },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return children;
}
