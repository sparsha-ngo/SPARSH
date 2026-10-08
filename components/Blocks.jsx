import Accordion from "@/components/Accordion";

const LABEL_CLASSES =
  "shrink-0 font-display text-xs font-bold tracking-[0.06em] text-brand";

export function Blocks({ blocks, depth = 0 }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, index) => (
        <Block key={`${block.type}-${index}`} block={block} depth={depth} />
      ))}
    </div>
  );
}

export function Block({ block, depth = 0 }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="leading-relaxed text-slate-700">{block.text}</p>
      );

    case "points":
      return (
        <ul className="space-y-3">
          {block.items.map((item, index) => (
            <li key={`${item.label}-${index}`} className="flex gap-3">
              <span className={`${LABEL_CLASSES} pt-1`}>{item.label}</span>
              <span className="leading-relaxed text-slate-700">{item.text}</span>
            </li>
          ))}
        </ul>
      );

    case "definition":
      return (
        <div className="rounded-2xl border border-brand-pale/80 bg-brand-mist/60 p-5">
          <h5 className="font-display text-sm font-bold tracking-wide text-brand-deep">
            {block.term}
          </h5>
          <div className="mt-3">
            <Blocks blocks={block.blocks} depth={depth + 1} />
          </div>
        </div>
      );

    case "group":
      return (
        <div className="rounded-2xl border border-brand-pale/80 bg-white p-5">
          <h5 className="font-display text-sm font-bold tracking-wide text-brand-dark">
            {block.label}
          </h5>
          <div className="mt-4">
            <Blocks blocks={block.blocks} depth={depth + 1} />
          </div>
        </div>
      );

    case "note":
      return (
        <p className="rounded-xl bg-brand-pale/40 px-4 py-3 text-sm italic text-brand-dark">
          {block.text}
        </p>
      );

    case "table":
      return (
        <div className="overflow-x-auto rounded-2xl border border-brand-pale/80 bg-white">
          <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
            <thead className="bg-brand-dark font-display text-xs uppercase tracking-[0.12em] text-white">
              <tr>
                {block.head.map((cell) => (
                  <th key={cell} scope="col" className="px-4 py-3 font-semibold">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-pale/70">
              {block.rows.map((row, rowIndex) => (
                <tr
                  key={`row-${rowIndex}`}
                  className="transition-colors hover:bg-brand-mist/70"
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={`cell-${rowIndex}-${cellIndex}`}
                      className="px-4 py-3 text-slate-700"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "image":
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={block.src}
          alt={block.alt}
          className="h-32 w-32 rounded-full"
        />
      );

    case "accordion":
      return (
        <Accordion
          idPrefix={`acc-${block.items[0]?.id ?? "group"}`}
          defaultOpenId={block.items[0]?.id}
          items={block.items.map((item) => ({
            id: item.id,
            label: item.label,
            content: <Blocks blocks={item.blocks} depth={depth + 1} />,
          }))}
        />
      );

    default:
      return null;
  }
}
