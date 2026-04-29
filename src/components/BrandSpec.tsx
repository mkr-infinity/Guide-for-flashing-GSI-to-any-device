import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface BrandSpecRow {
  label: string;
  value: React.ReactNode;
}

interface BrandSpecProps {
  rows: BrandSpecRow[];
  difficulty?: "Easy" | "Medium" | "Hard" | "Very Hard" | "Mostly Locked";
  difficultyNote?: string;
}

const difficultyStyles: Record<string, string> = {
  Easy: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  Medium: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
  Hard: "bg-orange-500/15 text-orange-700 dark:text-orange-300 border-orange-500/30",
  "Very Hard": "bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/30",
  "Mostly Locked": "bg-zinc-500/15 text-zinc-700 dark:text-zinc-300 border-zinc-500/30",
};

export function BrandSpec({ rows, difficulty, difficultyNote }: BrandSpecProps) {
  return (
    <Card className="not-prose border-primary/20 bg-gradient-to-br from-emerald-50/50 to-teal-50/30 dark:from-emerald-950/20 dark:to-teal-950/10 shadow-sm overflow-hidden">
      <CardContent className="p-0">
        <div className="px-5 py-3 bg-primary/5 border-b border-primary/10 flex items-center justify-between flex-wrap gap-2">
          <div className="text-xs uppercase tracking-wider font-bold text-primary">
            Brand at a glance
          </div>
          {difficulty && (
            <div className={cn("text-xs font-bold px-2.5 py-1 rounded-full border", difficultyStyles[difficulty])}>
              {difficulty}
              {difficultyNote && <span className="ml-1.5 font-normal opacity-80">· {difficultyNote}</span>}
            </div>
          )}
        </div>
        <div className="divide-y divide-border/50">
          {rows.map((row) => (
            <div key={row.label} className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1 sm:gap-4 px-5 py-3 text-sm">
              <div className="font-semibold text-muted-foreground uppercase text-xs tracking-wider sm:tracking-normal sm:text-sm sm:normal-case sm:font-medium sm:text-foreground/70 mt-0.5">
                {row.label}
              </div>
              <div className="text-foreground [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:bg-muted [&_code]:rounded [&_code]:text-[0.85em] [&_code]:font-mono">
                {row.value}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
