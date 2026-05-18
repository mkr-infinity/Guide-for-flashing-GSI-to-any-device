interface StepImageProps {
  src: string;
  alt: string;
  caption?: string;
  size?: "small" | "medium" | "large" | "phone";
}

export function StepImage({ src, alt, caption, size = "medium" }: StepImageProps) {
  const widthClass = {
    small: "max-w-xs",
    medium: "max-w-md",
    large: "max-w-3xl",
    phone: "max-w-[260px]",
  }[size];

  return (
    <figure className="my-10 flex flex-col items-center">
      <div className={`${widthClass} w-full rounded-xl overflow-hidden border border-border/80 bg-background shadow-lg`}>
        <div className="border-b border-border/50 bg-sidebar px-3 py-2 flex items-center gap-1.5 opacity-80 pb-2">
          <div className="w-2.5 h-2.5 rounded-full bg-border/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-border/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-border/80"></div>
        </div>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-auto block opacity-95 transition-opacity hover:opacity-100 object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-4 text-[13px] text-muted-foreground text-center max-w-lg font-medium opacity-80">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
