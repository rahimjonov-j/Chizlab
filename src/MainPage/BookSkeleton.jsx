import React from 'react'

export default function BookCardSkeleton() {
  return (
    <div className="h-[430px] w-[300px] rounded-xl border bg-muted animate-pulse overflow-hidden">
      {/* Image skeleton */}
      <div className="h-[300px] w-full bg-muted-foreground/20" />

      {/* Content skeleton */}
      <div className="p-4 space-y-4">
        <div className="h-4 w-3/4 bg-muted-foreground/20 rounded" />
        <div className="flex gap-2">
          <div className="h-5 w-20 bg-muted-foreground/20 rounded-full" />
          <div className="h-5 w-24 bg-muted-foreground/20 rounded-full" />
        </div>

        <div className="space-y-2">
          <div className="h-3 w-1/2 bg-muted-foreground/20 rounded" />
          <div className="h-3 w-1/3 bg-muted-foreground/20 rounded" />
        </div>

        <div className="space-y-2">
          <div className="h-3 w-full bg-muted-foreground/20 rounded" />
          <div className="h-3 w-5/6 bg-muted-foreground/20 rounded" />
        </div>
      </div>
    </div>
  )
}
