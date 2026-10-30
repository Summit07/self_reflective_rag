"use client";

import React, { useRef, useState } from "react";
import { IndexResponse } from "@/lib/api";
import { X, FileText } from "lucide-react";

interface LoadIndexPanelProps {
  onIndexSamples: () => Promise<void>;
  onUploadFiles: (files: File[]) => Promise<void>;
  isIndexingSamples: boolean;
  isUploading: boolean;
  lastIndexResult: IndexResponse | null;
}

export function LoadIndexPanel({
  onIndexSamples,
  onUploadFiles,
  isIndexingSamples,
  isUploading,
  lastIndexResult,
}: LoadIndexPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArr = Array.from(e.target.files);
      setSelectedFiles(filesArr);
    }
  };

  const removeFile = (idx: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== idx));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    await onUploadFiles(selectedFiles);
    setSelectedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="panel">
      {/* Panel Heading */}
      <div className="panel-heading">
        <div>
          <span className="section-tag">STEP 1–3</span>
          <h2>Load and index documents</h2>
        </div>
        <span className="round-icon">↥</span>
      </div>

      <p className="muted">
        Start with the included sample files, or add your own learning materials.
      </p>

      {/* Index sample files button */}
      <button
        type="button"
        className="btn btn-primary"
        onClick={onIndexSamples}
        disabled={isIndexingSamples || isUploading}
      >
        {isIndexingSamples ? "Indexing samples…" : "Index sample files"}{" "}
        <span>→</span>
      </button>

      {/* Separator */}
      <div className="separator">
        <span>OR UPLOAD YOUR FILES</span>
      </div>

      {/* Upload Zone */}
      <label className="upload-zone" htmlFor="fileInput">
        <span className="upload-symbol">＋</span>
        <b>Choose PDF, DOCX, or TXT</b>
        <small>Multiple files supported</small>
        <input
          id="fileInput"
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.txt"
          multiple
          onChange={handleFileChange}
        />
      </label>

      {/* Selected file badges */}
      {selectedFiles.length > 0 && (
        <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "6px" }}>
          {selectedFiles.map((file, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "6px 10px",
                borderRadius: "8px",
                background: "rgba(148, 163, 184, 0.1)",
                fontSize: "12px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px", overflow: "hidden" }}>
                <FileText style={{ width: "14px", height: "14px", color: "var(--orange)", flexShrink: 0 }} />
                <span style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                  {file.name}
                </span>
                <span style={{ fontSize: "10px", color: "var(--muted)" }}>
                  ({Math.round(file.size / 1024)} KB)
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(i);
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--muted)",
                  padding: "2px",
                }}
              >
                <X style={{ width: "14px", height: "14px" }} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload and index button */}
      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleUpload}
        disabled={selectedFiles.length === 0 || isUploading || isIndexingSamples}
      >
        {isUploading ? "Uploading and indexing…" : "Upload and index files"}
      </button>

      {/* Result box */}
      {lastIndexResult && (
        <div className="result-box">
          <b>Indexing completed</b>
          <br />
          {lastIndexResult.files && lastIndexResult.files.length > 0 ? (
            lastIndexResult.files.map((f, i) => (
              <React.Fragment key={i}>
                {f.filename}: {f.chunks} chunks
                <br />
              </React.Fragment>
            ))
          ) : (
            <>No files indexed<br /></>
          )}
          <b>Total chunks added:</b> {lastIndexResult.total_chunks_added || 0}
          <br />
          <b>Chunks in database:</b> {lastIndexResult.collection_count ?? "—"}
          {lastIndexResult.errors && lastIndexResult.errors.length > 0 && (
            <>
              <br />
              {lastIndexResult.errors.map((e, i) => (
                <div key={i} style={{ color: "#b42318" }}>
                  ⚠ {e}
                </div>
              ))}
            </>
          )}
        </div>
      )}

      {/* Mini note */}
      <div className="mini-note">
        <b>What does indexing do?</b>
        Text is split into chunks. ChromaDB creates embeddings automatically and
        stores each chunk for later similarity search.
      </div>
    </div>
  );
}
