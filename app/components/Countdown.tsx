"use client";

import { useEffect, useState } from "react";
import { daysUntilWedding } from "../lib/wedding";

function label(days: number) {
  if (days > 1) return `${days} days to go`;
  if (days === 1) return "1 day to go";
  if (days === 0) return "Today is the day";
  return "Married";
}

export function Countdown({ initialDays }: { initialDays: number }) {
  const [days, setDays] = useState(initialDays);

  useEffect(() => {
    setDays(daysUntilWedding());
  }, []);

  return <span className="countdown">{label(days)}</span>;
}
