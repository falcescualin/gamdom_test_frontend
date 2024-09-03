import classNames from "classnames";

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Box: React.FC<BoxProps> = ({ children, className, ...props }) => {
  const baseClasses = classNames(
    "p-4 bg-white rounded-md shadow-sm",
    className
  );

  return (
    <div className={baseClasses} {...props}>
      {children}
    </div>
  );
};

export default Box;
