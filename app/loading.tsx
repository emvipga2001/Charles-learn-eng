'use client'

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
      <span className="ml-4 text-xl font-semibold animate-pulse text-white">L o a d i n g . . .</span>
    </div>
  );
}