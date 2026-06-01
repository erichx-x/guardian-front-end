import { ApiResponse } from '@/types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function mockFetch<T>(data: T, delayMs = 300): Promise<T> {
  await delay(delayMs);
  return JSON.parse(JSON.stringify(data)) as T;
}

export async function mockResponse<T>(data: T, total?: number, delayMs = 300): Promise<ApiResponse<T>> {
  await delay(delayMs);
  return { data: JSON.parse(JSON.stringify(data)) as T, total };
}
