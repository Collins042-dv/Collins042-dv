// TODO: Replace with real auth provider (Supabase, Firebase, etc.)
// Currently uses localStorage mock — NOT production-ready
const AUTH_ENABLED = false;
const USERS_KEY = "oma-luxury-auth-users";
const CURRENT_USER_KEY = "oma-luxury-auth-current-user";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

interface StoredAuthUser extends AuthUser {
  password: string;
}

function getStorage() {
  if (typeof window === "undefined") {
    return null;
  }
  return window.localStorage;
}

function getUsers(): StoredAuthUser[] {
  const storage = getStorage();
  if (!storage) {
    return [];
  }
  const raw = storage.getItem(USERS_KEY);
  return raw ? (JSON.parse(raw) as StoredAuthUser[]) : [];
}

function setUsers(users: StoredAuthUser[]) {
  const storage = getStorage();
  if (!storage) {
    return;
  }
  storage.setItem(USERS_KEY, JSON.stringify(users));
}

function setCurrentUser(user: AuthUser | null) {
  const storage = getStorage();
  if (!storage) {
    return;
  }
  if (user) {
    storage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    storage.removeItem(CURRENT_USER_KEY);
  }
}

export async function register(name: string, email: string, password: string): Promise<AuthUser> {
  if (AUTH_ENABLED) {
    throw new Error("Real auth provider not configured.");
  }

  const users = getUsers();
  const normalizedEmail = email.trim().toLowerCase();
  if (users.some((user) => user.email.toLowerCase() === normalizedEmail)) {
    throw new Error("An account with this email already exists.");
  }

  const user: StoredAuthUser = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    password,
  };

  users.push(user);
  setUsers(users);
  const authUser: AuthUser = { id: user.id, name: user.name, email: user.email };
  setCurrentUser(authUser);
  return authUser;
}

export async function login(email: string, password: string): Promise<AuthUser> {
  if (AUTH_ENABLED) {
    throw new Error("Real auth provider not configured.");
  }

  const user = getUsers().find(
    (item) => item.email.toLowerCase() === email.trim().toLowerCase() && item.password === password,
  );

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const authUser: AuthUser = { id: user.id, name: user.name, email: user.email };
  setCurrentUser(authUser);
  return authUser;
}

export async function logout(): Promise<void> {
  setCurrentUser(null);
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const storage = getStorage();
  if (!storage) {
    return null;
  }
  const raw = storage.getItem(CURRENT_USER_KEY);
  return raw ? (JSON.parse(raw) as AuthUser) : null;
}

export async function updateCurrentUser(data: Partial<AuthUser>): Promise<AuthUser> {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("No active session found.");
  }

  const updatedUser = { ...currentUser, ...data };
  const users = getUsers().map((user) =>
    user.id === currentUser.id ? { ...user, name: updatedUser.name, email: updatedUser.email } : user,
  );

  setUsers(users);
  setCurrentUser(updatedUser);
  return updatedUser;
}
