// components/LastViewedTime.tsx
"use client";

import { formatRelativeTime } from "@/app/utils/dateFormatter";
import { useEffect, useState } from "react";

interface LastViewedTimeProps {
  date: Date | string;
}

export default function LastViewedTime({ date }: LastViewedTimeProps) {
  const [timeString, setTimeString] = useState(formatRelativeTime(date));

  useEffect(() => {
    setTimeString(formatRelativeTime(date));

    const interval = setInterval(() => {
      setTimeString(formatRelativeTime(date));
    }, 60000);

    return () => clearInterval(interval);
  }, [date]);

  return (
    <span className="text-xs text-gray-500" suppressHydrationWarning>
      {timeString}
    </span>
  );
}
