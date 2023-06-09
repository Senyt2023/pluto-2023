import React from "react";
import clsx from "clsx";

export const Text = ({ children, title, header, secondary }) => {
  return (
    <div
      className={clsx([
        "text-textColor-secondary font-body text-sm",
        title && `text-textColor-primary font-title font-semibold !text-2xl`,
        header &&
          `text-textColor-primary font-special font-semibold !text-lg
        `,
        secondary && `text-textColor-tertiary`,
      ])}
    >
      {children}
    </div>
  );
};