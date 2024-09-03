import classNames from "classnames";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  ...props
}) => {
  const baseClasses = classNames(
    "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    className
  );

  return (
    <div className={baseClasses} {...props}>
      {children}
    </div>
  );
};

export default Container;
