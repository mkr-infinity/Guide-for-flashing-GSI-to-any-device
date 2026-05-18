import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({ code, language = "bash", showLineNumbers = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl bg-zinc-950 dark:bg-black/40 border border-zinc-800 dark:border-border overflow-hidden my-6 shadow-md text-zinc-50">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/80 dark:bg-sidebar border-b border-zinc-800 dark:border-border">
        <span className="text-xs font-mono font-medium text-zinc-400 dark:text-muted-foreground uppercase tracking-wider">{language}</span>
        <button
          className={cn(
            "flex items-center gap-1.5 h-7 px-2 rounded-md text-xs font-medium transition-colors border",
            copied 
              ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" 
              : "text-zinc-400 dark:text-muted-foreground bg-transparent border-transparent hover:bg-zinc-800 dark:hover:bg-muted hover:text-zinc-100 dark:hover:text-foreground hover:border-zinc-700 dark:hover:border-border"
          )}
          onClick={handleCopy}
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-sm">
        <pre className="font-mono text-zinc-100 dark:text-foreground/90 leading-relaxed">
          <code>
            {code.split("\n").map((line, i) => (
              <div key={i} className="table-row">
                {showLineNumbers && (
                  <span className="table-cell pr-4 text-zinc-500 dark:text-muted-foreground/50 select-none text-right w-8 text-xs">{i + 1}</span>
                )}
                <span className="table-cell">{line || " "}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
