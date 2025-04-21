import React from "react";

interface StatusCardProps {
  endpoint: string;
  status: string;
  ts: string;
}

export const StatusCard: React.FC<StatusCardProps> = ({ endpoint, status, ts }) => (
  <div className="rounded-lg bg-emerald-600/10 ring-1 ring-emerald-400/30 p-6 animate-[fadeIn_300ms_ease-out] max-w-xl mx-auto">
    <div className="flex items-center justify-between mb-2">
      <span className="font-semibold tracking-tight text-base text-emerald-700 dark:text-emerald-300">{endpoint}</span>
      <span className="text-xs text-emerald-500 dark:text-emerald-400">{ts}</span>
    </div>
    <div className="text-3xl text-emerald-500 font-bold tracking-tight">ONLINE</div>
  </div>
);
