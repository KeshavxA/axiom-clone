export default function TableSkeleton() {
    return (
      <div className="w-full animate-pulse space-y-4 p-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-white/5" />
              <div className="space-y-2">
                <div className="h-4 w-32 rounded bg-white/5" />
                <div className="h-3 w-16 rounded bg-white/5" />
              </div>
            </div>
            <div className="h-4 w-24 rounded bg-white/5" />
            <div className="hidden md:block h-4 w-24 rounded bg-white/5" />
            <div className="hidden md:block h-4 w-24 rounded bg-white/5" />
          </div>
        ))}
      </div>
    );
  }