import Link from "next/link";

export function SectionHeading({ title, href = "#" }: { title: string; href?: string }) {
  return (
    <div className="mb-4 flex items-center justify-between px-4 sm:px-6">
      <h2 className="text-[14px] font-semibold">{title}</h2>
      <Link
        href={href}
        className="rounded-full bg-white px-4 py-1.5 text-[12px] font-medium transition-colors hover:bg-ink hover:text-white"
      >
        Discover more
      </Link>
    </div>
  );
}
