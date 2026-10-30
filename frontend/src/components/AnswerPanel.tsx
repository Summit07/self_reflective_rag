"use client";

import React from "react";
import { AskResponse } from "@/lib/api";

interface AnswerPanelProps {
  data: AskResponse | null;
}

export function AnswerPanel({ data }: AnswerPanelProps) {
  if (!data) return null;

  return (
    <section id="answerPanel" className="panel answer-panel">
      {/* Panel heading */}
      <div className="panel-heading">
        <div>
          <span className="section-tag">RESULT</span>
          <h2>Claude’s answer</h2>
        </div>
        <span
          className="mode-badge"
          style={{
            background: data.retrieval_used ? "#e8f8f0" : "#f1f5f9",
            color: data.retrieval_used ? "#13794f" : "#475569",
          }}
        >
          {data.retrieval_used ? "RAG · RETRIEVAL ON" : "BASELINE · RETRIEVAL OFF"}
        </span>
      </div>

      {/* Answer text */}
      <div className="answer-text">{data.answer}</div>

      {/* Evidence heading */}
      <div className="evidence-heading">
        <h3>Retrieved chunks</h3>
        <span className="count-badge">
          {data.chunks_considered} chunk{data.chunks_considered === 1 ? "" : "s"}
        </span>
      </div>

      <p className="muted">
        {data.retrieval_used
          ? "These are the passages returned by ChromaDB and supplied to Claude as reference context. Distance is a similarity-search distance; lower is generally closer."
          : "Retrieval was skipped, so no indexed document chunks were sent to Claude."}
      </p>

      {/* Chunks list */}
      <div className="chunks-list">
        {data.retrieved_chunks && data.retrieved_chunks.length > 0 ? (
          data.retrieved_chunks.map((chunk, idx) => (
            <article key={idx} className="chunk-card">
              <div className="chunk-meta">
                <span>
                  {chunk.source} · Chunk {chunk.chunk_number}
                </span>
                {chunk.distance !== null && (
                  <span>Distance: {chunk.distance}</span>
                )}
              </div>
              <p>{chunk.text}</p>
            </article>
          ))
        ) : (
          <p className="muted">
            {data.retrieval_used
              ? "No matching chunks were returned."
              : "No chunks retrieved because you selected NO."}
          </p>
        )}
      </div>
    </section>
  );
}
