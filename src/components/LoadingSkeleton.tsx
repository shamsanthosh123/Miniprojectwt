import { memo } from "react";

export const CampaignCardSkeleton = memo(function CampaignCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden card-simple animate-pulse">
      <div className="h-64 bg-gray-200" />
      <div className="p-7 space-y-4">
        <div className="h-7 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="space-y-3 pt-4">
          <div className="h-3 bg-gray-200 rounded-full w-full" />
          <div className="flex justify-between">
            <div className="h-4 bg-gray-200 rounded w-24" />
            <div className="h-4 bg-gray-200 rounded w-16" />
          </div>
        </div>
        <div className="h-12 bg-gray-200 rounded-lg w-full mt-4" />
      </div>
    </div>
  );
});

export const TableRowSkeleton = memo(function TableRowSkeleton({ columns = 8 }: { columns?: number }) {
  return (
    <tr className="animate-pulse">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 bg-gray-200 rounded w-full" />
        </td>
      ))}
    </tr>
  );
});

export const StatsCardSkeleton = memo(function StatsCardSkeleton() {
  return (
    <div className="p-6 border border-gray-200 bg-white rounded-lg animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
          <div className="h-8 bg-gray-200 rounded w-32" />
        </div>
        <div className="w-12 h-12 bg-gray-200 rounded-full" />
      </div>
    </div>
  );
});
