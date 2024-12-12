import { ArrowUpRight } from "lucide-react";
import * as React from "react";
import { cn } from "utils";

type TColorProp = string | string[];

interface BadgeProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
  shineColor?: TColorProp;
  shine?: boolean;
  variant?: "green" | "custom";
  icon?: React.ReactNode;
  gradientFrom?: string;
  gradientTo?: string;
}

export const Badge = React.forwardRef<HTMLAnchorElement, BadgeProps>(
  (
    {
      className,
      borderRadius = 8,
      borderWidth = 1,
      duration = 14,
      shineColor = "#22c55e",
      shine = false,
      variant = "green",
      icon = <ArrowUpRight />,
      gradientFrom,
      gradientTo,
      children,
      ...props
    },
    ref,
  ) => {
    const getVariantStyles = () => {
      switch (variant) {
        case "green":
          return {
            badge:
              "bg-gradient-to-b from-green-900/50 to-green-700 text-green-300 hover:text-green-200 dark:from-green-700/50 dark:to-gray-900 dark:text-green-300 dark:hover:text-green-200",
            glow: "from-green-500 to-green-600 dark:from-green-400 dark:to-green-500",
          };
        case "custom":
          return {
            badge: "",
            glow: `from-${gradientFrom} to-${gradientTo}`,
          };
        default:
          return {
            badge: "",
            glow: "",
          };
      }
    };

    const variantStyles = getVariantStyles();

    const baseElement = (
      <a
        ref={ref}
        className={cn(
          "group relative flex h-10 items-center gap-2 rounded-full px-6 text-lg font-medium",
          variantStyles.badge,
          className,
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
          {icon && (
            <span className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              {icon}
            </span>
          )}
        </span>
        <div
          className={cn(
            "absolute inset-0 rounded-full bg-gradient-to-r opacity-0 blur transition-opacity group-hover:opacity-20 dark:opacity-40",
            variantStyles.glow,
          )}
        />
        <div
          className={cn(
            "absolute -inset-0.5 rounded-full bg-gradient-to-r opacity-30",
            variantStyles.glow,
          )}
        />
      </a>
    );

    if (!shine) return baseElement;

    return (
      <div
        style={
          { "--border-radius": `${borderRadius}px` } as React.CSSProperties
        }
        className="relative w-fit rounded-[--border-radius]"
      >
        {baseElement}
        <div
          style={
            {
              "--border-width": `${borderWidth}px`,
              "--border-radius": `${borderRadius}px`,
              "--duration": `${duration}s`,
              "--mask-linear-gradient":
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              "--background-radial-gradient": `radial-gradient(transparent,transparent, ${shineColor instanceof Array ? shineColor.join(",") : shineColor},transparent,transparent)`,
            } as React.CSSProperties
          }
          className="before:bg-shine-size motion-safe:before:animate-shine pointer-events-none before:absolute before:inset-0 before:size-full before:rounded-[--border-radius] before:p-[--border-width] before:will-change-[background-position] before:content-[''] before:![-webkit-mask-composite:xor] before:[background-image:--background-radial-gradient] before:[background-size:300%_300%] before:![mask-composite:exclude] before:[mask:--mask-linear-gradient]"
        />
      </div>
    );
  },
);

Badge.displayName = "Badge";
