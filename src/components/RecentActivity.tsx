import React from "react";

interface RecentActivityProps {
  lines: string[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ lines }) => (
  <div className="rounded-lg bg-slate-100 dark:bg-slate-800 ring-1 ring-slate-300/30 p-6 max-w-xl mx-auto">
    <div className="font-semibold tracking-tight text-base mb-2 text-slate-700 dark:text-slate-200">Recent Activity</div>
    <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300 font-mono">
      {lines.length === 0 ? (
        <li className="italic text-slate-400">No recent activity found.</li>
      ) : (
        lines.map((line, idx) => <li key={idx}>{line}</li>)
      )}
    </ul>
  </div>
);
