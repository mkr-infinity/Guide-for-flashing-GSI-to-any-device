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
      classes: "bg-red-500/5 border-red-500/20 text-red-900 dark:text-red-200",
      iconBg: "bg-red-500/10 text-red-600 dark:text-red-400",
      titleColor: "text-red-800 dark:text-red-100",
      defaultTitle: "Warning",
    },
    tip: {
      icon: Lightbulb,
      classes: "bg-emerald-500/5 border-emerald-500/20 text-emerald-900 dark:text-emerald-200",
      iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      titleColor: "text-emerald-800 dark:text-emerald-100",
      defaultTitle: "Tip",
    },
    note: {
      icon: Info,
      classes: "bg-blue-500/5 border-blue-500/20 text-blue-900 dark:text-blue-200",
      iconBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      titleColor: "text-blue-800 dark:text-blue-100",
      defaultTitle: "Note",
    },
    success: {
      icon: CheckCircle2,
      classes: "bg-emerald-500/5 border-emerald-500/20 text-emerald-900 dark:text-emerald-200",
      iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      titleColor: "text-emerald-800 dark:text-emerald-100",
      defaultTitle: "Success",
    },
  };

  const { icon: Icon, classes, iconBg, titleColor, defaultTitle } = config[type];

  return (
    <div className={cn("my-6 flex gap-4 rounded-xl border p-5 shadow-sm backdrop-blur-md", classes)}>
      <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg mt-0.5", iconBg)}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <h5 className={cn("mb-1 font-semibold leading-tight tracking-tight", titleColor)}>
          {title || defaultTitle}
        </h5>
        <div className="text-sm leading-relaxed opacity-90 [&>p]:mb-0 [&_a]:font-medium [&_a]:underline [&_ul]:my-2 [&_li]:mt-1">
          {children}
        </div>
      </div>
    </div>
  );
}
