import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "16px 24px",
        borderBottom: "1px solid #eee",
      }}
    >
      <Link href="/courses">Courses</Link>
      <Link href="/about">About</Link>
    </nav>
  );
}