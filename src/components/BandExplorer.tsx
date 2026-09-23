"use client";

import { useState, ChangeEvent } from "react";
import { Band } from "@/types/band";
import BandCard from "./BandCard";

interface BandExplorerProps {
  bands: Band[];
}

export default function BandExplorer({ bands }: BandExplorerProps) {
  // State หลัก
  const [keyword, setKeyword] = useState<string>("");
  const [followedIds, setFollowedIds] = useState<number[]>([]);
  const [onlyFollowed, setOnlyFollowed] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<"none" | "name" | "year">("none");

  // จัดการ Event ติดตาม / เลิกติดตาม
  const handleToggleFollow = (id: number) => {
    setFollowedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // ส่วนขยาย: ปุ่มล้างเงื่อนไขทั้งหมดกลับสู่สถานะเริ่มต้น
  const handleResetFilters = () => {
    setKeyword("");
    setOnlyFollowed(false);
    setSortBy("none");
  };

  // คำนวณค้นหาและกรอง (Derived State)
  const filteredBands = bands.filter((band) => {
    const search = keyword.trim().toLowerCase();
    const matchKeyword =
      band.name.toLowerCase().includes(search) ||
      band.genre.toLowerCase().includes(search);
    const matchFollowed = onlyFollowed ? followedIds.includes(band.id) : true;
    return matchKeyword && matchFollowed;
  });

  // ส่วนขยาย: จัดเรียงลำดับจากเงื่อนไขใน State
  const sortedBands = [...filteredBands].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "year") return a.formedYear - b.formedYear;
    return 0;
  });

  return (
    <section>
      {/* แถบควบคุมและเครื่องมือ */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "16px" }}>
        <input
          type="search"
          aria-label="ค้นหาวงดนตรี"
          placeholder="ค้นหาชื่อวงหรือแนวเพลง..."
          value={keyword}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
          style={{ padding: "8px", width: "250px", borderRadius: "4px", border: "1px solid #ccc" }}
        />

        <button
          type="button"
          onClick={() => setOnlyFollowed((prev) => !prev)}
          style={{
            padding: "8px 12px",
            cursor: "pointer",
            backgroundColor: onlyFollowed ? "#0070f3" : "#eee",
            color: onlyFollowed ? "#fff" : "#000",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          {onlyFollowed ? "แสดงทุกวง" : "แสดงเฉพาะวงที่ติดตาม"}
        </button>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "none" | "name" | "year")}
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        >
          <option value="none">เรียงลำดับเริ่มต้น</option>
          <option value="name">เรียงตามชื่อวง (A-Z)</option>
          <option value="year">เรียงตามปีก่อตั้ง</option>
        </select>

        <button
          type="button"
          onClick={handleResetFilters}
          style={{ padding: "8px 12px", cursor: "pointer", borderRadius: "4px", border: "1px solid #ccc" }}
        >
          ล้างเงื่อนไขทั้งหมด
        </button>
      </div>

      {/* แถบแสดงสถานะจำนวน */}
      <p style={{ margin: "10px 0" }}>
        กำลังติดตาม: <strong>{followedIds.length}</strong> วง | แสดงอยู่:{" "}
        <strong>{sortedBands.length}</strong> วง
      </p>

      {/* Empty State หรือ รายการการ์ด */}
      {sortedBands.length === 0 ? (
        <p style={{ color: "gray", marginTop: "20px" }}>ไม่พบวงดนตรีตรงตามเงื่อนไขที่ค้นหา</p>
      ) : (
        <div>
          {sortedBands.map((band) => (
            <BandCard
              key={band.id}
              band={band}
              isFollowed={followedIds.includes(band.id)}
              onToggleFollow={handleToggleFollow}
            />
          ))}
        </div>
      )}
    </section>
  );
}