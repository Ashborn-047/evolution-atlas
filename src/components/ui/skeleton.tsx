function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={`bg-[#1A1A1A] animate-pulse rounded-md ${className || ''}`}
      {...props}
    />
  );
}

export { Skeleton };
