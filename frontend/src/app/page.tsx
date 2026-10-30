"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { HeroJourney } from "@/components/HeroJourney";
import { PipelineSteps } from "@/components/PipelineSteps";
import { LoadIndexPanel } from "@/components/LoadIndexPanel";
import { AskQuestionPanel } from "@/components/AskQuestionPanel";
import { AnswerPanel } from "@/components/AnswerPanel";
import { ConceptStrip } from "@/components/ConceptStrip";
import {
  fetchStatus,
  indexSamples,
  uploadFiles,
  askQuestion,
  IndexResponse,
  AskResponse,
} from "@/lib/api";

export default function Home() {
  // Status state
  const [indexedChunks, setIndexedChunks] = useState<number | null>(null);
  const [backendOnline, setBackendOnline] = useState<boolean>(false);
  const [isLoadingStatus, setIsLoadingStatus] = useState<boolean>(false);

  // Notification state
  const [notice, setNotice] = useState<{
    message: string | null;
    type: "success" | "error" | null;
  }>({ message: null, type: null });

  // Indexing states
  const [isIndexingSamples, setIsIndexingSamples] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [lastIndexResult, setLastIndexResult] = useState<IndexResponse | null>(null);

  // Question states
  const [question, setQuestion] = useState<string>("");
  const [retrieve, setRetrieve] = useState<boolean>(true);
  const [topK, setTopK] = useState<number>(4);
  const [isAsking, setIsAsking] = useState<boolean>(false);
  const [answerResult, setAnswerResult] = useState<AskResponse | null>(null);

  const loadStatus = useCallback(async () => {
    setIsLoadingStatus(true);
    try {
      const data = await fetchStatus();
      setIndexedChunks(data.indexed_chunks);
      setBackendOnline(true);
    } catch {
      setBackendOnline(false);
    } finally {
      setIsLoadingStatus(false);
    }
  }, []);

  useEffect(() => {
    loadStatus();
    const interval = setInterval(loadStatus, 15000);
    return () => clearInterval(interval);
  }, [loadStatus]);

  const handleIndexSamples = async () => {
    setNotice({ message: null, type: null });
    setIsIndexingSamples(true);
    try {
      const data = await indexSamples();
      setLastIndexResult(data);
      setNotice({
        message: "Sample documents have been indexed. You can ask a question now.",
        type: "success",
      });
      await loadStatus();
    } catch (err: any) {
      setNotice({
        message: err.message || "Failed to index sample files.",
        type: "error",
      });
    } finally {
      setIsIndexingSamples(false);
    }
  };

  const handleUploadFiles = async (files: File[]) => {
    setNotice({ message: null, type: null });
    setIsUploading(true);
    try {
      const data = await uploadFiles(files);
      setLastIndexResult(data);
      setNotice({
        message: `Your documents have been indexed (${data.total_chunks_added || 0} chunks added).`,
        type: "success",
      });
      await loadStatus();
    } catch (err: any) {
      setNotice({
        message: err.message || "Failed to upload and index files.",
        type: "error",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleAsk = async () => {
    const trimmed = question.trim();
    if (!trimmed) {
      setNotice({
        message: "Please enter a question first.",
        type: "error",
      });
      return;
    }

    setNotice({ message: null, type: null });
    setIsAsking(true);
    try {
      const result = await askQuestion({
        question: trimmed,
        retrieve,
        top_k: topK,
      });
      setAnswerResult(result);
      setNotice({
        message: "Answer generated successfully.",
        type: "success",
      });
      await loadStatus();

      // Smooth scroll to answer
      setTimeout(() => {
        document
          .getElementById("answerPanel")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err: any) {
      setNotice({
        message: err.message || "Failed to generate answer.",
        type: "error",
      });
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <>
      {/* Top Header */}
      <Header
        indexedChunks={indexedChunks}
        backendOnline={backendOnline}
        isLoadingStatus={isLoadingStatus}
        onRefreshStatus={loadStatus}
      />

      {/* Main Container */}
      <main className="container-rag">
        {/* Hero Journey Card */}
        <HeroJourney />

        {/* 5-Step Pipeline Strip */}
        <PipelineSteps />

        {/* Notice alert */}
        {notice.message && notice.type && (
          <div className={`notice ${notice.type}`} role="status">
            {notice.message}
          </div>
        )}

        {/* Grid layout */}
        <section className="grid-layout">
          {/* Step 1–3 */}
          <LoadIndexPanel
            onIndexSamples={handleIndexSamples}
            onUploadFiles={handleUploadFiles}
            isIndexingSamples={isIndexingSamples}
            isUploading={isUploading}
            lastIndexResult={lastIndexResult}
          />

          {/* Step 4–5 */}
          <AskQuestionPanel
            question={question}
            onQuestionChange={setQuestion}
            retrieve={retrieve}
            onRetrieveChange={setRetrieve}
            topK={topK}
            onTopKChange={setTopK}
            onAsk={handleAsk}
            isAsking={isAsking}
          />
        </section>

        {/* Answer panel (Step 5 Result) */}
        <AnswerPanel data={answerResult} />

        {/* Concept Strip */}
        <ConceptStrip />

        {/* Footer */}
        <footer>Self Reflective RAG </footer>
      </main>
    </>
  );
}
