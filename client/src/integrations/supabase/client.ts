// Migration layer - redirects Supabase calls to local API endpoints
import type { Database } from './types';

// Utility function to make API requests
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`/api${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  if (response.status === 204) {
    return { data: null, error: null };
  }

  const data = await response.json();
  return { data, error: null };
}

// Create a mock Supabase client that redirects to our API
const createMockSupabaseClient = () => {
  return {
    from: (table: string) => {
      return {
        select: (columns?: string) => ({
          eq: (column: string, value: any) => apiRequest(`/${table}?${column}=${value}`),
          order: (column: string, options?: any) => apiRequest(`/${table}`),
          limit: (count: number) => apiRequest(`/${table}`),
          single: () => apiRequest(`/${table}`),
          then: (callback: any) => apiRequest(`/${table}`).then(callback),
        }),
        insert: (data: any) => ({
          select: () => apiRequest(`/${table}`, {
            method: 'POST',
            body: JSON.stringify(data),
          }),
          then: (callback: any) => apiRequest(`/${table}`, {
            method: 'POST',
            body: JSON.stringify(data),
          }).then(callback),
        }),
        update: (data: any) => ({
          eq: (column: string, value: any) => ({
            select: () => apiRequest(`/${table}/${value}`, {
              method: 'PUT',
              body: JSON.stringify(data),
            }),
            then: (callback: any) => apiRequest(`/${table}/${value}`, {
              method: 'PUT',
              body: JSON.stringify(data),
            }).then(callback),
          }),
        }),
        delete: () => ({
          eq: (column: string, value: any) => ({
            then: (callback: any) => apiRequest(`/${table}/${value}`, {
              method: 'DELETE',
            }).then(callback),
          }),
        }),
        upsert: (data: any) => ({
          select: () => apiRequest(`/${table}`, {
            method: 'POST',
            body: JSON.stringify(data),
          }),
          then: (callback: any) => apiRequest(`/${table}`, {
            method: 'POST',
            body: JSON.stringify(data),
          }).then(callback),
        }),
      };
    },
    auth: {
      signInWithPassword: async (credentials: any) => {
        // Mock auth - in a real app, implement proper authentication
        return { data: { user: null, session: null }, error: null };
      },
      signOut: async () => {
        return { error: null };
      },
      getSession: async () => {
        return { data: { session: null }, error: null };
      },
      onAuthStateChange: (callback: any) => {
        // Mock auth state change
        return { data: { subscription: { unsubscribe: () => {} } } };
      },
    },
  };
};

export const supabase = createMockSupabaseClient();