// RoadVision AI — Authentication & Session Service Layer
// Clean abstraction ready to connect with FastAPI / Flask / Express (POST /api/auth/login, etc.)

const SESSION_KEY = 'roadvision_auth_session_v1';
const REGISTERED_USERS_KEY = 'roadvision_registered_users_v1';

// Base API URL from environment, or fallback to demo simulation
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

// Pre-configured realistic engineering roles & demo credentials
export const DEMO_ACCOUNTS = [
  {
    email: 'testuser@gmail.com',
    password: 'test@123',
    name: 'Test Engineer',
    role: 'Senior QA/QC Inspector',
    department: 'Materials Testing Lab',
    initials: 'TE',
    avatarBg: 'bg-primary',
  },
  {
    email: 'inspector@roadvision.ai',
    password: 'RoadVision#2026',
    name: 'Er. R. Sharma',
    role: 'Senior QA/QC Inspector',
    department: 'Site Laboratory Km 142+500',
    initials: 'RS',
    avatarBg: 'bg-primary',
  },
  {
    email: 'engineer@roadvision.ai',
    password: 'RoadVision#2026',
    name: 'Er. K. Mehta',
    role: 'Project Materials Engineer',
    department: 'Pavement Quality Division',
    initials: 'KM',
    avatarBg: 'bg-sand',
  },
  {
    email: 'auditor@roadvision.ai',
    password: 'RoadVision#2026',
    name: 'Dr. A. Verma',
    role: 'MoRTH Quality Auditor',
    department: 'Regional Quality Directorate',
    initials: 'AV',
    avatarBg: 'bg-charcoal',
  },
];

/**
 * Retrieve registered accounts from localStorage
 */
function getRegisteredUsers() {
  try {
    const raw = localStorage.getItem(REGISTERED_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('Error reading registered users', err);
    return [];
  }
}

/**
 * Save new registered user
 */
function saveRegisteredUser(user) {
  try {
    const current = getRegisteredUsers();
    const updated = [user, ...current.filter((u) => u.email !== user.email)];
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Error saving registered user', err);
  }
}

/**
 * Get active session user from localStorage or sessionStorage
 */
export function getCurrentSession() {
  try {
    // Check localStorage (Remember Me)
    const local = localStorage.getItem(SESSION_KEY);
    if (local) return JSON.parse(local);

    // Check sessionStorage
    const session = sessionStorage.getItem(SESSION_KEY);
    if (session) return JSON.parse(session);
  } catch (err) {
    console.warn('Error reading session', err);
  }
  return null;
}

/**
 * Authenticate User (Sign In)
 */
export async function loginUser(email, password, rememberMe = false) {
  const normalizedEmail = email.trim().toLowerCase();

  // If a real backend API URL is configured, use fetch
  if (API_BASE_URL) {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: normalizedEmail, password }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || 'Invalid email or password. Please try again.');
    }

    const data = await response.json();
    const sessionUser = {
      ...data.user,
      token: data.token,
    };

    if (rememberMe) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    } else {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    }

    return sessionUser;
  }

  // Simulated authentication pipeline with realistic network delay
  await new Promise((resolve) => setTimeout(resolve, 450));

  // 1. Check against demo accounts
  const demoMatch = DEMO_ACCOUNTS.find(
    (acc) => acc.email.toLowerCase() === normalizedEmail && acc.password === password
  );

  // 2. Check against registered accounts
  const registeredUsers = getRegisteredUsers();
  const registeredMatch = registeredUsers.find(
    (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
  );

  const matchedAccount = demoMatch || registeredMatch;

  if (!matchedAccount) {
    throw new Error('Invalid email or password. Please try again.');
  }

  const sessionUser = {
    id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
    email: matchedAccount.email,
    name: matchedAccount.name,
    role: matchedAccount.role || 'QA/QC Inspector',
    department: matchedAccount.department || 'Field Materials Laboratory',
    initials:
      matchedAccount.initials ||
      matchedAccount.name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase(),
    token: `rv_jwt_${btoa(`${matchedAccount.email}:${Date.now()}`)}`,
    loginAt: new Date().toISOString(),
  };

  // Store in session or local storage
  if (rememberMe) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
  } else {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
  }

  return sessionUser;
}

/**
 * Register User (Create Account)
 */
export async function registerUser({ name, email, password, role = 'QA/QC Inspector' }) {
  const normalizedEmail = email.trim().toLowerCase();

  // If a real backend API URL is configured, use fetch
  if (API_BASE_URL) {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email: normalizedEmail, password, role }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || 'Registration failed. Please try again.');
    }

    return await response.json();
  }

  // Simulated registration
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Check if email is already in demo accounts or registered users
  const isDemo = DEMO_ACCOUNTS.some((d) => d.email.toLowerCase() === normalizedEmail);
  const existing = getRegisteredUsers().some((u) => u.email.toLowerCase() === normalizedEmail);

  if (isDemo || existing) {
    throw new Error('An account with this email address already exists. Please sign in.');
  }

  const newUser = {
    name: name.trim(),
    email: normalizedEmail,
    password,
    role,
    department: 'Site Laboratory',
    createdAt: new Date().toISOString(),
  };

  saveRegisteredUser(newUser);

  return {
    success: true,
    message: 'Account created successfully. Please sign in.',
  };
}

/**
 * Password Recovery Request
 */
export async function sendPasswordReset(email) {
  const normalizedEmail = email.trim().toLowerCase();

  if (API_BASE_URL) {
    const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: normalizedEmail }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || 'Password reset request failed.');
    }

    return await response.json();
  }

  // Simulated response
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    success: true,
    message: 'If an account exists for this email, password reset instructions have been sent.',
  };
}

/**
 * Sign out and clear active session
 */
export function logoutUser() {
  try {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
  } catch (err) {
    console.warn('Error clearing session', err);
  }
}
