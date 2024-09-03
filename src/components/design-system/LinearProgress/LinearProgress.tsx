import React from "react";
import classNames from "classnames";

interface LinearProgressProps {
  value?: number;
  variant?: "determinate" | "indeterminate" | "buffer" | "query";
  color?: string;
  valueBuffer?: number;
  className?: string;
}

const LinearProgress: React.FC<LinearProgressProps> = ({
  value = 0,
  variant = "determinate",
  color = "bg-blue-500",
  valueBuffer = 0,
  className,
}) => {
  const commonClasses = "h-2 rounded-full transition-all ease-out";

  const progressBarClasses = classNames(commonClasses, color, {
    "w-full animate-progress-indeterminate": variant === "indeterminate",
    "w-full": variant === "query",
    [`w-[${value}%]`]: variant === "determinate",
  });

  const bufferClasses = classNames(
    commonClasses,
    "bg-gray-200",
    {
      [`w-[${valueBuffer}%]`]: variant === "buffer",
    },
    className
  );

  return (
    <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
      {variant === "buffer" && (
        <div
          className={bufferClasses}
          style={{ width: `${valueBuffer}%` }}
         />
      )}
      <div className={progressBarClasses} style={{ width: `${value}%` }} />
    </div>
  );
};

export default LinearProgress;
