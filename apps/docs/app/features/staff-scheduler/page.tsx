export default function PepPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Staff Scheduling</h1>

      <div className="space-y-6">
        {/* Placeholder for filters */}
        <div className="p-4 rounded-lg border border-border bg-card">
          <h2 className="text-lg font-semibold mb-4">Filter</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-10 rounded bg-secondary animate-pulse" />
            <div className="h-10 rounded bg-secondary animate-pulse" />
            <div className="h-10 rounded bg-secondary animate-pulse" />
          </div>
        </div>

        {/* Placeholder for the main table */}
        <div className="rounded-lg border border-border overflow-hidden">
          <div className="bg-card p-4 border-b border-border">
            <h2 className="text-lg font-semibold">Plan</h2>
          </div>
          <div className="p-4">
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="grid grid-cols-4 gap-4">
                  <div className="h-8 rounded bg-secondary animate-pulse" />
                  <div className="h-8 rounded bg-secondary animate-pulse" />
                  <div className="h-8 rounded bg-secondary animate-pulse" />
                  <div className="h-8 rounded bg-secondary animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
