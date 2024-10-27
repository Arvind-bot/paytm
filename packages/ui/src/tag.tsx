"use client";

const tagSizes = {
  sm: "px-[0.6rem] py-[.15rem] text-[.8rem]",
  md: "px-[1.2rem] py-[.3rem] text-[.875rem]",
  lg: "px-[1.3rem] py-[.4rem] text-[.1rem]",
};

const tagBgColors = {
  Default: "bg-gray-200",
  Success: "bg-green-200",
  Failure: "bg-red-200",
  Processing: "bg-gray-200",
};

export const Tag = ({
  color = "Default",
  size = "sm",
  className,
  text,
}: {
  text: string;
  className?: string;
  color?: keyof typeof tagBgColors;
  size?: keyof typeof tagSizes;
}) => {
  const tagSize = tagSizes[size];
  const tagBgColor = tagBgColors[color];
  return (
    <div
      className={` ${tagBgColor} ${tagSize} m-1 rounded-[100rem] ${className || ""}`}
    >
      {text || "dormgljfkd"}
    </div>
  );
};
