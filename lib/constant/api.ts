// lib/constants/api.ts
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.example.com';

export const API_ENDPOINTS = {
  GET_ALL_WORDS: `${API_BASE_URL}/list-word`
} as const;