import type { Metadata } from "next";
import { bands } from "@/data/bands";
import BandExplorer from "@/components/BandExplorer";

export const metadata: Metadata = {
  title: "Favorite Bands",
};

export default function BandsPage() {
  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "24px" }}>
      <h1>คลังวงดนตรีโปรด (Favorite Bands)</h1>
      <BandExplorer bands={bands} />
    </main>
  );
}