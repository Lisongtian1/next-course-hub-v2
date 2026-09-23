"use client";

import { useState } from "react";
import { Band } from "@/types/band";

interface BandCardProps {
  band: Band;
  isFollowed: boolean;
  onToggleFollow: (id: number) => void;
}

export default function BandCard({
  band,
  isFollowed,
  onToggleFollow,
}: BandCardProps) {
  const [likes, setLikes] = useState<number>(0);

  return (
    <article
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "12px",
        backgroundColor: "#fff",
      }}
    >
      <h2>{band.name}</h2>
      <p>แนวเพลง: {band.genre}</p>
      <p>ปีก่อตั้ง: {band.formedYear}</p>
      {/* คำนวณจำนวนสมาชิกจาก Array โดยตรง ไม่เพิ่ม State */}
      <p>จำนวนสมาชิก: {band.members.length} คน ({band.members.join(", ")})</p>

      <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
        <button
          type="button"
          onClick={() => onToggleFollow(band.id)}
          style={{
            padding: "6px 12px",
            cursor: "pointer",
            backgroundColor: isFollowed ? "#ff4d4f" : "#eee",
            color: isFollowed ? "#fff" : "#000",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          {isFollowed ? "เลิกติดตาม" : "+ ติดตาม"}
        </button>

        <button
          type="button"
          onClick={() => setLikes((prev) => prev + 1)}
          style={{
            padding: "6px 12px",
            cursor: "pointer",
            backgroundColor: "#f0f0f0",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          👍 Like ({likes})
        </button>
      </div>
    </article>
  );
}