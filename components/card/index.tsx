export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`!z-5 relative p-5 flex flex-col rounded-lg bg-white bg-clip-border shadow-3xl shadow-shadow-100 border border-navy-400/20 dark:shadow-none dark:!bg-navy-800 dark:text-white ${className}`}
    >
      {children}
    </section>
  );
}
