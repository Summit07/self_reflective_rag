"use client";

import React from "react";

interface StepItem {
  num: string;
  emoji: string;
  title: string;
  sub: string;
}

const STEPS: StepItem[] = [
  {
    num: "01",
    emoji: "📚",
    title: "Read files",
    sub: "PDF, DOCX, TXT",
  },
  {
    num: "02",
    emoji: "✂️",
    title: "Chunk text",
    sub: "Split into pieces",
  },
  {
    num: "03",
    emoji: "🧭",
    title: "Index",
    sub: "Embeddings + ChromaDB",
  },
  {
    num: "04",
    emoji: "💬",
    title: "Ask question",
    sub: "Choose Yes or No",
  },
  {
    num: "05",
    emoji: "✨",
    title: "Claude answers",
    sub: "With or without context",
  },
];

export function PipelineSteps() {
  return (
    <section className="steps" aria-label="RAG pipeline">
      {STEPS.map((step, idx) => (
        <React.Fragment key={step.num}>
          <div className="step">
            <span className="step-num">{step.num}</span>
            <div className="step-icon">{step.emoji}</div>
            <b>{step.title}</b>
            <small>{step.sub}</small>
          </div>
          {idx < STEPS.length - 1 && <div className="step-arrow">→</div>}
        </React.Fragment>
      ))}
    </section>
  );
}
