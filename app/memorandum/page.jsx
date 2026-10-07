import LegalDocument from "@/components/LegalDocument";
import { memorandum } from "@/data/memorandum";

export const metadata = {
  title: "Memorandum",
};

export default function MemorandumPage() {
  return <LegalDocument document={memorandum} />;
}
