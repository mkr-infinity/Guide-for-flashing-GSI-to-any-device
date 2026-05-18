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
  Easy: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  Medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Hard: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
  "Very Hard": "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  "Mostly Locked": "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20",
};

export function BrandSpec({ rows, difficulty, difficultyNote }: BrandSpecProps) {
  return (
    <Card className="not-prose mb-10 border-border bg-sidebar/50 shadow-sm overflow-hidden backdrop-blur-sm rounded-xl">
      <CardContent className="p-0">
        <div className="px-5 py-4 bg-sidebar border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs uppercase tracking-widest font-bold text-muted-foreground">
            Brand specifications
          </div>
          {difficulty && (
            <div className={cn("inline-flex w-fit text-[11px] font-bold px-2.5 py-1 rounded-md border uppercase tracking-wider", difficultyStyles[difficulty])}>
              {difficulty}
              {difficultyNote && <span className="ml-2 font-medium opacity-80 normal-case tracking-normal border-l border-current pl-2"> {difficultyNote}</span>}
            </div>
          )}
        </div>
        <div className="divide-y divide-border/60">
          {rows.map((row) => (
            <div key={row.label} className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-6 px-5 py-3.5 text-sm transition-colors hover:bg-muted/30">
              <div className="font-semibold text-muted-foreground text-xs sm:text-sm mt-0.5">
                {row.label}
              </div>
              <div className="text-foreground/90 font-medium [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:bg-muted [&_code]:rounded-md [&_code]:border [&_code]:border-border/50 [&_code]:text-[0.85em] [&_code]:font-mono [&_code]:font-semibold [&_code]:text-primary">
                {row.value}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
