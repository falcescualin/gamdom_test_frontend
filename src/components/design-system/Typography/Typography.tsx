import classNames from "classnames";

interface TypographyProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "body" | "caption";
  children: React.ReactNode;
  className?: string;
}

const Typography: React.FC<TypographyProps> = ({
  variant = "body",
  children,
  className,
  ...props
}) => {
  const baseClasses = classNames(className, {
    "text-3xl font-bold": variant === "h1",
    "text-2xl font-semibold": variant === "h2",
    "text-xl font-medium": variant === "h3",
    "text-lg font-medium": variant === "h4",
    "text-base": variant === "body",
    "text-sm": variant === "caption",
  });

  return (
    <div className={baseClasses} {...props}>
      {children}
    </div>
  );
};

export default Typography;
