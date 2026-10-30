"use client";

import React from "react";
import { ThemeToggle } from "./theme-toggle";
import { RefreshCw } from "lucide-react";

interface HeaderProps {
  indexedChunks: number | null;
  backendOnline: boolean;
  isLoadingStatus: boolean;
  onRefreshStatus: () => void;
}

export function Header({
  indexedChunks,
  backendOnline,
  isLoadingStatus,
  onRefreshStatus,
}: HeaderProps) {
  return (
    <header className="topbar">
      {/* Brand logo matching image */}
      <div className="brand-mark">
        <span className="brand-v">Self</span>
        <span className="brand-pro">RAG</span>
        {/* <span className="brand-skills">SKILLS</span> */}
      </div>

      {/* Center copy */}
      <div className="top-copy">
        {/* <span className="eyebrow">HANDS-ON LEARNING LAB</span> */}
        <h1>Understand Self Reflective RAG, step by step</h1>
        <p>PDF · DOCX · TXT &nbsp;|&nbsp; ChromaDB &nbsp;|&nbsp; Claude</p>
      </div>

      {/* Right side status and theme toggle */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div className="status-pill">
          <span
            className="pulse"
            style={{
              background: backendOnline ? "#20a36b" : "#f0a12b",
            }}
          />
          <span id="statusText">
            {backendOnline
              ? `${indexedChunks ?? 0} chunks indexed`
              : "Backend unavailable"}
          </span>
          <button
            onClick={onRefreshStatus}
            disabled={isLoadingStatus}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "2px",
              display: "flex",
              alignItems: "center",
              color: "inherit",
              opacity: 0.65,
            }}
            title="Refresh status"
          >
            <RefreshCw
              style={{
                width: "12px",
                height: "12px",
                animation: isLoadingStatus ? "spin 1s linear infinite" : "none",
              }}
            />
          </button>
        </div>

        {/* Dark & Light Theme Toggle */}
        <ThemeToggle />
      </div>
    </header>
  );
}
