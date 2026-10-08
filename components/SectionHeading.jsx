export default function SectionHeading({ title, id, tone = "dark", className = "" }) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <h2
        id={id}
        className={`scroll-mt-28 font-display text-3xl font-extrabold tracking-tight sm:text-4xl ${
          tone === "light" ? "text-white" : "text-brand-deep"
        }`}
      >
        {title}
      </h2>
      <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-brand to-brand-light" />
    </div>
  );
}
