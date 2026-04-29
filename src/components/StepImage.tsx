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
    large: "max-w-2xl",
    phone: "max-w-[260px]",
  }[size];

  return (
    <figure className="my-8 flex flex-col items-center">
      <div className={`${widthClass} w-full rounded-2xl overflow-hidden border border-border bg-muted/30 shadow-md`}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-auto block"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-muted-foreground text-center max-w-md italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
