import { BookOpenCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  inverted?: boolean;
  compact?: boolean;
};

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[13px] bg-slate-950 text-white shadow-sm ring-1 ring-slate-900/10",
        className
      )}
    >
      <span className="absolute inset-x-1.5 top-1 h-px bg-white/20" />
      <BookOpenCheck className="relative h-[22px] w-[22px] stroke-[2.35] text-indigo-300" />
      <span className="absolute bottom-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500 ring-2 ring-slate-950" />
    </span>
  );
}

export function BrandLogo({ className, inverted = false, compact = false }: BrandLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <BrandMark className={compact ? "h-8 w-8 rounded-[10px]" : undefined} />
      <span
        className={cn(
          "text-[1.05rem] font-black tracking-[-0.035em]",
          inverted ? "text-white" : "text-slate-950"
        )}
      >
        GCSE<span className={inverted ? "text-indigo-300" : "text-indigo-600"}>Revise</span>
      </span>
    </span>
  );
}
