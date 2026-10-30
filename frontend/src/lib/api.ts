export interface StatusResponse {
  indexed_chunks: number;
  model: string;
}

export interface IndexedFileInfo {
  filename: string;
  chunks: number;
  characters: number;
}

export interface IndexResponse {
  files: IndexedFileInfo[];
  total_chunks_added: number;
  errors: string[];
  collection_count?: number;
  uploaded_files?: string[];
}

export interface RetrievedChunk {
  text: string;
  source: string;
  chunk_number: number | string;
  distance: number | null;
}

export interface AskRequest {
  question: string;
  retrieve: boolean;
  top_k: number;
}

export interface AskResponse {
  answer: string;
  retrieval_used: boolean;
  retrieved_chunks: RetrievedChunk[];
  chunks_considered: number;
  indexed_chunks: number;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

async function handleResponse<T>(res: Response): Promise<T> {
  let data: any = {};
  try {
    data = await res.json();
  } catch {
    // If not json
  }
  if (!res.ok) {
    const errorMsg = data.detail || `Request failed with status ${res.status}`;
    throw new Error(errorMsg);
  }
  return data as T;
}

export async function fetchStatus(): Promise<StatusResponse> {
  const res = await fetch(`${API_BASE}/api/status`, {
    cache: "no-store",
  });
  return handleResponse<StatusResponse>(res);
}

export async function indexSamples(): Promise<IndexResponse> {
  const res = await fetch(`${API_BASE}/api/index-samples`, {
    method: "POST",
  });
  return handleResponse<IndexResponse>(res);
}

export async function uploadFiles(files: File[]): Promise<IndexResponse> {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  const res = await fetch(`${API_BASE}/api/upload`, {
    method: "POST",
    body: formData,
  });
  return handleResponse<IndexResponse>(res);
}

export async function askQuestion(payload: AskRequest): Promise<AskResponse> {
  const res = await fetch(`${API_BASE}/api/ask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return handleResponse<AskResponse>(res);
}

