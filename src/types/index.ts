export type Technique = {
  id: string;
  technique: string;
  category: string;
  description: string;
  video: string;
  thumbnail?: string;
  tags?: string[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'user';
  status: 'active' | 'inactive';
  createdAt: string;
};

export type LoginCredentials = {
  username: string;
  password: string;
};

export type AuthUser = {
  id: string;
  name: string;
  role: User['role'];
};

export type ApiResponse<T> = {
  data: T;
  total?: number;
};

export type SearchParams = {
  q?: string;
  category?: string;
  page?: number;
  limit?: number;
};
