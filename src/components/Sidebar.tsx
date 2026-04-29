import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { SECTIONS, Section, BRAND_ICONS } from "../sections";

interface SidebarProps {
  activePath: string;
}

export function Sidebar({ activePath }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Group sections
  const groupedSections = SECTIONS.reduce((acc, section) => {
    if (!acc[section.group]) acc[section.group] = [];
    acc[section.group].push(section);
    return acc;
  }, {} as Record<string, Section[]>);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [activePath]);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border">
      {/* Header / Logo */}
      <div className="p-6 pb-4 flex items-center gap-3">
        <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
        <div>
          <h2 className="text-base font-bold tracking-tight text-sidebar-foreground leading-tight">
            GSI Flash Guide
          </h2>
          <p className="text-xs text-sidebar-foreground/60 font-medium">
            Android · All Devices
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 pb-6 space-y-6">
        {Object.entries(groupedSections).map(([group, groupSections]) => (
          <div key={group} className="space-y-1">
            <h3 className="text-xs font-bold text-sidebar-foreground/50 uppercase tracking-wider mb-2 px-2">
              {group}
            </h3>
            {groupSections.map((section) => {
              const isActive = activePath === section.path || (activePath === "/" && section.path === "/");
              const BrandIcon = section.brand ? BRAND_ICONS[section.brand] : null;

              return (
                <Link
                  key={section.id}
                  href={section.path}
                  className={cn(
                    "flex items-center w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-primary/10 text-sidebar-primary font-semibold"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}
                >
                  {section.numberLabel && (
                    <span className={cn(
                      "flex items-center justify-center w-5 h-5 rounded-full text-[10px] mr-3 shrink-0 transition-colors",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground font-bold"
                        : "bg-sidebar-foreground/10 text-sidebar-foreground"
                    )}>
                      {section.numberLabel}
                    </span>
                  )}
                  {BrandIcon && (
                    <span className={cn(
                      "flex items-center justify-center w-6 h-6 rounded-md mr-3 shrink-0 transition-colors",
                      isActive
                        ? "bg-sidebar-primary/15 text-sidebar-primary"
                        : "bg-sidebar-foreground/5 text-sidebar-foreground/80 group-hover:text-sidebar-foreground"
                    )}>
                      <BrandIcon className="w-[14px] h-[14px]" />
                    </span>
                  )}
                  <span className="truncate">{section.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer Profile Card */}
      <div className="p-4 border-t border-sidebar-border bg-sidebar/50">
        <a 
          href="https://github.com/mkr-infinity" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent transition-colors group"
        >
          <img 
            src="https://avatars.githubusercontent.com/u/125804924?v=4" 
            alt="Author avatar" 
            className="w-10 h-10 rounded-full border border-border group-hover:border-primary/50 transition-colors"
          />
          <div>
            <div className="text-sm font-semibold text-sidebar-foreground">@mkr-infinity</div>
            <div className="text-xs text-sidebar-foreground/60">View on GitHub</div>
          </div>
        </a>
      </div>
    </div>
  );

  return (
    <>
      <div className="lg:hidden fixed top-3 left-3 z-50">
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="relative w-72 max-w-[80%] h-full bg-background flex flex-col shadow-2xl">
            <div className="absolute top-4 right-4 z-50">
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 fixed inset-y-0 left-0 z-40">
        <SidebarContent />
      </aside>
    </>
  );
}
