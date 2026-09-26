/**
 * Saro Agency CMS - Backend API Client
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export interface AdminUser {
  id: string;
  email: string;
  full_name?: string;
  role: 'admin' | 'editor';
  avatar_url?: string;
}

export const authStorage = {
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('saro_admin_token');
  },

  setSession(token: string, user: AdminUser) {
    if (typeof window === 'undefined') return;
    localStorage.setItem('saro_admin_token', token);
    localStorage.setItem('saro_admin_user', JSON.stringify(user));
  },

  getUser(): AdminUser | null {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem('saro_admin_user');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  clearSession() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('saro_admin_token');
    localStorage.removeItem('saro_admin_user');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};

function toQueryString(params: Record<string, any> = {}): string {
  const q = new URLSearchParams();
  for (const [key, val] of Object.entries(params)) {
    if (val !== undefined && val !== null && val !== '' && val !== 'undefined' && val !== 'null') {
      q.append(key, String(val));
    }
  }
  const str = q.toString();
  return str ? `?${str}` : '';
}

interface RequestOptions extends RequestInit {
  auth?: boolean;
}

async function request<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { auth = true, headers = {}, ...rest } = options;
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const requestHeaders: Record<string, string> = {
    Accept: 'application/json',
    ...(headers as Record<string, string>),
  };

  // Attach token if authentication required
  if (auth) {
    const token = authStorage.getToken();
    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }
  }

  // If body is NOT FormData, set application/json
  if (rest.body && !(rest.body instanceof FormData)) {
    requestHeaders['Content-Type'] = 'application/json';
  }

  const response = await fetch(url, {
    ...rest,
    headers: requestHeaders,
  });

  const json = await response.json().catch(() => ({}));

  if (!response.ok) {
    // If unauthorized, clear session on 401
    if (response.status === 401 && typeof window !== 'undefined') {
      authStorage.clearSession();
    }
    const message = json.message || `Request failed with status ${response.status}`;
    const error = new Error(message) as any;
    error.status = response.status;
    error.details = json.errors || json.details;
    throw error;
  }

  return json.data !== undefined ? json.data : json;
}

export const api = {
  // --- AUTH ---
  async login(email: string, password: string) {
    const res = await request('/auth/login', {
      method: 'POST',
      auth: false,
      body: JSON.stringify({ email, password }),
    });

    if (res.session?.access_token) {
      authStorage.setSession(res.session.access_token, res.profile || res.user);
    }
    return res;
  },

  async logout() {
    try {
      await request('/auth/logout', { method: 'POST' });
    } finally {
      authStorage.clearSession();
    }
  },

  async getMe() {
    return request('/auth/me');
  },

  // --- ANALYTICS ---
  async getAnalyticsSummary() {
    return request('/analytics/summary');
  },

  // --- CLOUDINARY UPLOADS ---
  async uploadFile(file: File, folder: string = 'agency/general', resourceType: string = 'auto') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    formData.append('resource_type', resourceType);

    return request('/upload', {
      method: 'POST',
      body: formData,
    });
  },

  async deleteUploadedAsset(publicId: string, resourceType: string = 'image') {
    return request('/upload', {
      method: 'DELETE',
      body: JSON.stringify({ public_id: publicId, resource_type: resourceType }),
    });
  },

  // --- PORTFOLIO ---
  async getPortfolio(params: Record<string, any> = {}) {
    return request(`/portfolio${toQueryString(params)}`, { auth: false });
  },

  async getPortfolioAdmin(params: Record<string, any> = {}) {
    return request(`/portfolio${toQueryString(params)}`);
  },

  async getPortfolioById(id: string) {
    return request(`/portfolio/${id}`, { auth: false });
  },

  async getPortfolioBySlug(slug: string) {
    return request(`/portfolio/slug/${slug}`, { auth: false });
  },

  async createPortfolio(payload: any) {
    return request('/portfolio', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async updatePortfolio(id: string, payload: any) {
    return request(`/portfolio/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  async deletePortfolio(id: string) {
    return request(`/portfolio/${id}`, { method: 'DELETE' });
  },

  async addPortfolioMedia(id: string, media: any[]) {
    return request(`/portfolio/${id}/media`, {
      method: 'POST',
      body: JSON.stringify({ media }),
    });
  },

  async deletePortfolioMedia(mediaId: string) {
    return request(`/portfolio/media/${mediaId}`, { method: 'DELETE' });
  },

  // --- TESTIMONIALS ---
  async getTestimonials(all: boolean = true) {
    return request(`/testimonials${all ? '?all=true' : ''}`);
  },

  async createTestimonial(payload: any) {
    return request('/testimonials', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async updateTestimonial(id: string, payload: any) {
    return request(`/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  async deleteTestimonial(id: string) {
    return request(`/testimonials/${id}`, { method: 'DELETE' });
  },

  // --- CLIENT LOGOS ---
  async getLogos(all: boolean = true) {
    return request(`/client-logos${all ? '?all=true' : ''}`);
  },

  async createLogo(payload: any) {
    return request('/client-logos', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async updateLogo(id: string, payload: any) {
    return request(`/client-logos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  async deleteLogo(id: string) {
    return request(`/client-logos/${id}`, { method: 'DELETE' });
  },

  // --- CAREERS ---
  async getCareers(all: boolean = true) {
    return request(`/careers${all ? '?all=true' : ''}`);
  },

  async createCareer(payload: any) {
    return request('/careers', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async updateCareer(id: string, payload: any) {
    return request(`/careers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  async deleteCareer(id: string) {
    return request(`/careers/${id}`, { method: 'DELETE' });
  },

  // --- APPLICATIONS ---
  async getApplications(params: Record<string, any> = {}) {
    return request(`/applications${toQueryString(params)}`);
  },

  async updateApplicationStatus(id: string, status: string, notes?: string) {
    return request(`/applications/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status, notes }),
    });
  },

  async deleteApplication(id: string) {
    return request(`/applications/${id}`, { method: 'DELETE' });
  },

  // --- CONTACT SUBMISSIONS ---
  async submitContact(payload: { name: string; email: string; phone?: string; subject?: string; message: string }) {
    return request('/contacts', {
      method: 'POST',
      auth: false,
      body: JSON.stringify(payload),
    });
  },

  async submitApplication(careerId: string, formData: FormData) {
    return request(`/careers/${careerId}/apply`, {
      method: 'POST',
      auth: false,
      body: formData,
    });
  },

  async getContacts(params: Record<string, any> = {}) {
    return request(`/contacts${toQueryString(params)}`);
  },

  async updateContactStatus(id: string, status: string, notes?: string) {
    return request(`/contacts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status, notes }),
    });
  },

  async deleteContact(id: string) {
    return request(`/contacts/${id}`, { method: 'DELETE' });
  },

  // --- SITE SETTINGS ---
  async getSiteSettings() {
    return request('/site-settings', { auth: false });
  },

  async updateSiteSettings(payload: any) {
    return request('/site-settings', {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  // --- SYSTEM & SETUP ---
  async getSystemStatus() {
    return request('/system/status', { auth: false });
  },

  async getSchemaSql() {
    return request('/system/schema-sql', { auth: false });
  },

  async seedDatabase() {
    return request('/system/seed', { method: 'POST', auth: false });
  },
};
