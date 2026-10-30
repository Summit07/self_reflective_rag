"use client";

import React from "react";

const CONCEPTS = [
  {
    num: "01",
    title: "Chunking",
    desc: "Break long text into smaller passages.",
  },
  {
    num: "02",
    title: "Indexing",
    desc: "Store chunks and their vector embeddings.",
  },
  {
    num: "03",
    title: "Retrieval",
    desc: "Find chunks similar to the question.",
  },
  {
    num: "04",
    title: "Generation",
    desc: "Claude writes an answer using the available context.",
  },
];

export function ConceptStrip() {
  return (
    <section className="concept-strip">
      {CONCEPTS.map((c) => (
        <div key={c.num}>
          <span>{c.num}</span>
          <b>{c.title}</b>
          <p>{c.desc}</p>
        </div>
      ))}
    </section>
  );
}
