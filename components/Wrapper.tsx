import { cn } from "lib/utils";
import { ReactNode } from "react";

const Wrapper = ({
  children,
  customClass = "",
}: {
  children: ReactNode;
  customClass?: string;
}) => {
  return (
    <div
      className={cn(
        "w-full-h-full flex flex-col items-center max-w-5xl mx-auto px-2",
        customClass
      )}
    >
      {children}
    </div>
  );
};

export default Wrapper;
