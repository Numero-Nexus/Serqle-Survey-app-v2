interface ProgressProps {
  value: number;
  className?: string;
}

export function Progress({ value, className = "" }: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`w-full h-2 rounded-lg bg-muted overflow-hidden ${className}`}
    >
      <div
        className="h-full bg-primary rounded-lg transition-all duration-250 ease-out"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}