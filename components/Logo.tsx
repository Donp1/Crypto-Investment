import React from "react";

type Mode = "light" | "dark" | "auto";

export default function Logo({
  size = "text-3xl",
  mode = "auto",
}: {
  size?: string;
  mode?: Mode;
}) {
  const isDark = mode === "dark";
  const isLight = mode === "light";

  // Icon background
  const bgClass =
    mode === "auto"
      ? "bg-gradient-to-br from-yellow-400 to-yellow-600 dark:from-yellow-500 dark:to-yellow-700"
      : isDark
      ? "bg-gradient-to-br from-yellow-500 to-yellow-700"
      : "bg-gradient-to-br from-yellow-400 to-yellow-600";

  // Primary text color
  const primaryText =
    mode === "auto"
      ? "text-gray-900 dark:text-white"
      : isDark
      ? "text-white"
      : "text-gray-900";

  // Secondary text
  const secondaryText =
    mode === "auto"
      ? "text-gray-600 dark:text-gray-300"
      : isDark
      ? "text-gray-300"
      : "text-gray-600";

  return (
    <div className="flex items-center gap-2 select-none">
      {/* Icon */}
      <div
        className={`h-10 w-10 flex items-center justify-center rounded-xl shadow-md ${bgClass}`}
      >
        <span className="text-white font-bold text-xl">C</span>
      </div>

      {/* Text */}
      <div className="flex flex-col leading-tight">
        <span
          className={`${size} font-extrabold tracking-tight ${primaryText}`}
        >
          Cypot
        </span>
        <span
          className={`text-sm font-semibold -mt-1 tracking-wide ${secondaryText}`}
        >
          Invest
        </span>
      </div>
    </div>
  );
}
