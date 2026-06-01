import techniquesJson from '../../data/techniques.json';
import { Technique, ApiResponse, SearchParams } from '@/types';
import { mockResponse, mockFetch } from './api';

let techniques: Technique[] = techniquesJson.techniques.map((tech) => ({ ...tech }));

const normalize = (value: string) => value.trim().toLowerCase();

export async function getTechniques(params?: SearchParams): Promise<ApiResponse<Technique[]>> {
  const query = normalize(params?.q ?? '');
  const category = normalize(params?.category ?? '');
  const page = params?.page ?? 1;
  const limit = params?.limit ?? 12;

  let items = techniques.slice();

  if (query) {
    items = items.filter((tech) => {
      const text = `${tech.technique} ${tech.category} ${tech.description}`.toLowerCase();
      return text.includes(query);
    });
  }

  if (category) {
    items = items.filter((tech) => tech.category.toLowerCase() === category);
  }

  const total = items.length;
  const start = (page - 1) * limit;
  const data = items.slice(start, start + limit);

  return mockResponse(data, total);
}

export async function searchTechniques(query: string): Promise<ApiResponse<Technique[]>> {
  const normalized = normalize(query);
  if (!normalized) {
    return mockResponse([], 0);
  }

  const results = techniques
    .map((tech) => {
      const score = [tech.technique, tech.category, tech.description]
        .map((field) => normalize(field).includes(normalized) ? 1 : 0)
        .reduce((sum, value) => sum + value, 0);
      return { tech, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.tech);

  return mockResponse(results.slice(0, 8), results.length);
}

export async function getTechniqueById(id: string): Promise<Technique | null> {
  const technique = techniques.find((item) => item.id === id) ?? null;
  return mockFetch(technique);
}

export async function createTechnique(data: Omit<Technique, 'id'>): Promise<Technique> {
  const nextId = String(Date.now());
  const technique: Technique = {
    id: nextId,
    ...data,
  };
  techniques = [technique, ...techniques];
  return mockFetch(technique, 400);
}

export async function updateTechnique(id: string, data: Partial<Omit<Technique, 'id'>>): Promise<Technique> {
  const idx = techniques.findIndex((item) => item.id === id);
  if (idx === -1) {
    throw new Error('Técnica não encontrada');
  }
  techniques[idx] = { ...techniques[idx], ...data };
  return mockFetch(techniques[idx], 400);
}

export async function deleteTechnique(id: string): Promise<{ success: boolean }> {
  const existing = techniques.some((item) => item.id === id);
  if (!existing) {
    throw new Error('Técnica não encontrada');
  }
  techniques = techniques.filter((item) => item.id !== id);
  return mockFetch({ success: true }, 350);
}
