"use client";

import React from "react";

interface AskQuestionPanelProps {
  question: string;
  onQuestionChange: (q: string) => void;
  retrieve: boolean;
  onRetrieveChange: (r: boolean) => void;
  topK: number;
  onTopKChange: (k: number) => void;
  onAsk: () => Promise<void>;
  isAsking: boolean;
}

const SAMPLE_QUESTIONS = [
  "What is RAG and why do we use chunking?",
  "What is the role of ChromaDB?",
  "What is the difference between chunking and indexing?",
  "Why do we retrieve relevant chunks before generating an answer?",
];

export function AskQuestionPanel({
  question,
  onQuestionChange,
  retrieve,
  onRetrieveChange,
  topK,
  onTopKChange,
  onAsk,
  isAsking,
}: AskQuestionPanelProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAsk();
  };

  return (
    <form className="panel question-panel" onSubmit={handleSubmit}>
      {/* Panel Heading */}
      <div className="panel-heading">
        <div>
          <span className="section-tag">STEP 4–5</span>
          <h2>Ask a question</h2>
        </div>
        <span className="round-icon">✦</span>
      </div>

      {/* Field label */}
      <label className="field-label" htmlFor="question">
        Your question
      </label>

      {/* Textarea */}
      <textarea
        id="question"
        rows={3}
        value={question}
        onChange={(e) => onQuestionChange(e.target.value)}
        placeholder="Example: What is RAG and why do we use chunking?"
      />

      {/* Quick sample chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", margin: "8px 0 12px" }}>
        {SAMPLE_QUESTIONS.slice(0, 3).map((sample, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onQuestionChange(sample)}
            style={{
              fontSize: "11px",
              padding: "3px 9px",
              borderRadius: "15px",
              border: "1px solid var(--line)",
              background: "var(--paper)",
              color: "var(--muted)",
              cursor: "pointer",
            }}
          >
            {sample}
          </button>
        ))}
      </div>

      {/* Chunks to retrieve */}
      <div className="field-row">
        <label className="field-label" htmlFor="topK" style={{ margin: 0 }}>
          Chunks to retrieve
        </label>
        <select
          id="topK"
          value={topK}
          onChange={(e) => onTopKChange(Number(e.target.value))}
        >
          <option value="2">2 chunks</option>
          <option value="4">4 chunks</option>
          <option value="6">6 chunks</option>
          <option value="8">8 chunks</option>
        </select>
      </div>

      {/* Decision title */}
      <div className="decision-title">Do we need to retrieve chunks?</div>

      {/* Choice Grid */}
      <div className="choice-grid">
        {/* Choice YES */}
        <label
          className={`choice-card ${retrieve ? "selected" : ""}`}
          onClick={() => onRetrieveChange(true)}
        >
          <input
            type="radio"
            name="retrieve"
            value="yes"
            checked={retrieve}
            onChange={() => onRetrieveChange(true)}
          />
          <span className="choice-check">✓</span>
          <span className="choice-icon">🔎</span>
          <b>YES, retrieve</b>
          <small>Search ChromaDB and give matching chunks to Claude.</small>
          <em>RAG path</em>
        </label>

        {/* Choice NO */}
        <label
          className={`choice-card ${!retrieve ? "selected" : ""}`}
          onClick={() => onRetrieveChange(false)}
        >
          <input
            type="radio"
            name="retrieve"
            value="no"
            checked={!retrieve}
            onChange={() => onRetrieveChange(false)}
          />
          <span className="choice-check">✓</span>
          <span className="choice-icon">💭</span>
          <b>NO, skip retrieval</b>
          <small>Ask Claude without context from your indexed files.</small>
          <em>Baseline path</em>
        </label>
      </div>

      {/* Generate answer button */}
      <button
        type="submit"
        className="btn btn-primary btn-wide"
        disabled={isAsking || !question.trim()}
      >
        {isAsking ? "Claude is thinking…" : "Generate answer"}{" "}
        <span>→</span>
      </button>

      {/* Tiny note */}
      <p className="tiny-note">
        Claude API key is read only by the Python backend, never by browser JavaScript.
      </p>
    </form>
  );
}
