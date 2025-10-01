import type { Note } from "../types/note";
import axios from "axios";

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${myKey}`,
    "Content-Type": "application/json",
  },
});

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  search?: string;
  tag?: string;
  page?: number;
  perPage?: number;
  sortBy?: "created" | "updated";
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: string;
}

export async function fetchNotes(
  params: FetchNotesParams
): Promise<NotesResponse> {
  const res = await api.get<NotesResponse>("/notes", { params });

  return res.data;
}

export async function createNotes(noteData: CreateNoteParams): Promise<Note> {
  const res = await api.post<Note>("/notes", noteData);

  return res.data;
}

export const deleteNotes = async (id: string): Promise<Note> => {
  const res = await api.delete<Note>(`/notes/${id}`);
  return res.data;
};

export const fetchNotesById = async (id: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${id}`);

  return res.data;
};
