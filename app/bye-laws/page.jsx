import LegalDocument from "@/components/LegalDocument";
import { byeLaws } from "@/data/byelaws";

export const metadata = {
  title: "Bye-Laws",
};

export default function ByeLawsPage() {
  return <LegalDocument document={byeLaws} />;
}
