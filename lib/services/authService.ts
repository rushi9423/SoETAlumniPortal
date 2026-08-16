export interface UserProfile {
  id: string;
  email: string;
  role: 'student' | 'alumni' | 'admin';
  full_name: string;
  avatar_url?: string;
  is_active?: boolean;
  is_verified?: boolean;
}

const API_URL = 'http://127.0.0.1:8000';

export const authService = {
  async signIn(
    email: string,
    password: string,
    selectedRole: 'student' | 'alumni' | 'admin'
  ) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        role: selectedRole,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || 'Login failed. Please check your credentials.');
    }

    if (!data.access_token || !data.user) {
      throw new Error('Invalid response from authentication server.');
    }

    localStorage.setItem('soet_access_token', data.access_token);
    localStorage.setItem('soet_user', JSON.stringify(data.user));

    const profile: UserProfile = {
      id: data.user.id,
      email: data.user.email,
      role: data.user.role,
      full_name: data.user.name,
      is_verified: data.user.is_verified,
      is_active: true,
    };

    if (profile.role !== selectedRole) {
      localStorage.removeItem('soet_access_token');
      localStorage.removeItem('soet_user');

      throw new Error(
        `Access denied. Your account is registered as "${profile.role.toUpperCase()}", not "${selectedRole.toUpperCase()}". Please select the correct role.`
      );
    }

    return {
      user: data.user,
      profile,
      access_token: data.access_token,
    };
  },

  async signOut() {
    localStorage.removeItem('soet_access_token');
    localStorage.removeItem('soet_user');
  },

  async getCurrentUserProfile(): Promise<UserProfile | null> {
    const storedUser = localStorage.getItem('soet_user');

    if (!storedUser) {
      return null;
    }

    try {
      const user = JSON.parse(storedUser);

      return {
        id: user.id,
        email: user.email,
        role: user.role,
        full_name: user.name,
        is_verified: user.is_verified,
        is_active: true,
      };
    } catch {
      localStorage.removeItem('soet_user');
      localStorage.removeItem('soet_access_token');
      return null;
    }
  },
};