import LegalDocument from "@/components/LegalDocument";
import { byeLaws } from "@/data/byelaws";

export const metadata = {
  title: "Bye-law",
};

export default function ByeLawsPage() {
  return <LegalDocument document={byeLaws} />;
}
