import { AlertTriangle, Info, Lightbulb, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalloutProps {
  type: "warning" | "tip" | "note" | "success";
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type, title, children }: CalloutProps) {
  const config = {
    warning: {
      icon: AlertTriangle,
      classes: "bg-gradient-to-br from-red-500/10 to-rose-500/5 border-red-500/40 text-red-900 dark:text-red-200",
      iconBg: "bg-red-500/15 text-red-600 dark:text-red-400",
      titleColor: "text-red-900 dark:text-red-100",
      defaultTitle: "Warning",
    },
    tip: {
      icon: Lightbulb,
      classes: "bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border-emerald-500/40 text-emerald-900 dark:text-emerald-200",
      iconBg: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
      titleColor: "text-emerald-900 dark:text-emerald-100",
      defaultTitle: "Tip",
    },
    note: {
      icon: Info,
      classes: "bg-gradient-to-br from-blue-500/10 to-sky-500/5 border-blue-500/40 text-blue-900 dark:text-blue-200",
      iconBg: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
      titleColor: "text-blue-900 dark:text-blue-100",
      defaultTitle: "Note",
    },
    success: {
      icon: CheckCircle2,
      classes: "bg-gradient-to-br from-emerald-500/10 to-green-500/5 border-emerald-500/40 text-emerald-900 dark:text-emerald-200",
      iconBg: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
      titleColor: "text-emerald-900 dark:text-emerald-100",
      defaultTitle: "All good",
    },
  };

  const { icon: Icon, classes, iconBg, titleColor, defaultTitle } = config[type];

  return (
    <div className={cn("my-6 flex gap-4 rounded-xl border p-5 shadow-sm", classes)}>
      <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg", iconBg)}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <h5 className={cn("mb-1 font-semibold leading-tight tracking-tight", titleColor)}>
          {title || defaultTitle}
        </h5>
        <div className="text-sm leading-relaxed opacity-90 [&>p]:mb-0 [&_a]:font-medium [&_a]:underline">
          {children}
        </div>
      </div>
    </div>
  );
}
