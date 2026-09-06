/**
 * Authentication.
 *
 * One provider interface with two implementations, so the storage backend can
 * be swapped without touching page code.
 *
 * LocalAuthProvider keeps accounts in localStorage. Passwords are hashed with
 * SHA-256 over a per-account random salt, so the stored value is not the
 * password, but this is demo-grade only: anything in localStorage is readable
 * by any script on the origin and nothing server-side verifies a session.
 * Fill in the Supabase keys in assets/js/config.js for real accounts.
 */
import { readStorage, removeStorage, writeStorage } from './dom.js';

const USERS_KEY = 'kitchenlo-users';
const SESSION_KEY = 'kitchenlo-session';

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface SignUpDetails extends Credentials {
  name: string;
}

export interface AuthProvider {
  readonly name: string;
  current(): User | null;
  signUp(details: SignUpDetails): Promise<User>;
  signIn(details: Credentials): Promise<User>;
  signOut(): Promise<void>;
  updateProfile(updates: { name?: string }): Promise<User>;
  deleteAccount(): Promise<void>;
  onChange(listener: (user: User | null) => void): () => void;
}

interface StoredUser extends User {
  salt: string;
  hash: string;
  /** True when WebCrypto was unavailable and the weak fallback was used. */
  weak: boolean;
}

type UserTable = Record<string, StoredUser>;

/* ---------------------------------------------------------------- crypto -- */

function randomSalt(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

/** Non-cryptographic fallback for non-secure origins, flagged on the record. */
function weakHash(input: string): string {
  let h = 5381;
  for (let i = 0; i < input.length; i++) h = ((h << 5) + h + input.charCodeAt(i)) | 0;
  return 'weak:' + (h >>> 0).toString(16);
}

async function hashPassword(
  password: string,
  salt: string
): Promise<{ hash: string; weak: boolean }> {
  if (!globalThis.crypto?.subtle) {
    return { hash: weakHash(salt + password), weak: true };
  }
  const data = new TextEncoder().encode(salt + password);
  const buffer = await crypto.subtle.digest('SHA-256', data);
  const hash = Array.from(new Uint8Array(buffer), (b) => b.toString(16).padStart(2, '0')).join('');
  return { hash, weak: false };
}

function normaliseEmail(email: string): string {
  return String(email ?? '').trim().toLowerCase();
}

function publicUser(record: StoredUser): User {
  const { id, name, email, createdAt } = record;
  return { id, name, email, createdAt };
}

/* ------------------------------------------------------ LocalAuthProvider -- */

export class LocalAuthProvider implements AuthProvider {
  readonly name = 'local';
  private listeners: ((user: User | null) => void)[] = [];

  private users(): UserTable {
    return readStorage<UserTable>(USERS_KEY, {});
  }

  private emit(): void {
    const user = this.current();
    for (const listener of this.listeners) {
      try {
        listener(user);
      } catch {
        /* one listener throwing must not stop the others */
      }
    }
  }

  onChange(listener: (user: User | null) => void): () => void {
    this.listeners.push(listener);
    listener(this.current());
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  current(): User | null {
    const session = readStorage<{ email?: string } | null>(SESSION_KEY, null);
    if (!session?.email) return null;
    const record = this.users()[session.email];
    return record ? publicUser(record) : null;
  }

  async signUp(details: SignUpDetails): Promise<User> {
    const email = normaliseEmail(details.email);
    const name = String(details.name ?? '').trim();
    const password = String(details.password ?? '');

    if (!name) throw new Error('Please enter your name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      throw new Error('Please enter a valid email address.');
    }
    if (password.length < 8) throw new Error('Password must be at least 8 characters.');

    const users = this.users();
    if (users[email]) throw new Error('An account with that email already exists.');

    const salt = randomSalt();
    const { hash, weak } = await hashPassword(password, salt);

    users[email] = {
      id: 'u_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8),
      name,
      email,
      salt,
      hash,
      weak,
      createdAt: new Date().toISOString()
    };

    if (!writeStorage(USERS_KEY, users)) {
      throw new Error('Could not save your account. Browser storage may be full or blocked.');
    }
    writeStorage(SESSION_KEY, { email, since: Date.now() });
    this.emit();
    return publicUser(users[email]!);
  }

  async signIn(details: Credentials): Promise<User> {
    const email = normaliseEmail(details.email);
    const record = this.users()[email];

    // Identical message either way, so the form cannot be used to discover
    // which email addresses have accounts.
    const failure = new Error('Email or password is incorrect.');
    if (!record) throw failure;

    const { hash } = await hashPassword(String(details.password ?? ''), record.salt);
    if (hash !== record.hash) throw failure;

    writeStorage(SESSION_KEY, { email, since: Date.now() });
    this.emit();
    return publicUser(record);
  }

  async signOut(): Promise<void> {
    removeStorage(SESSION_KEY);
    this.emit();
  }

  async updateProfile(updates: { name?: string }): Promise<User> {
    const session = readStorage<{ email?: string } | null>(SESSION_KEY, null);
    if (!session?.email) throw new Error('You are not signed in.');

    const users = this.users();
    const record = users[session.email];
    if (!record) throw new Error('Account not found.');

    if (updates.name !== undefined) {
      const name = updates.name.trim();
      if (!name) throw new Error('Name cannot be empty.');
      record.name = name;
    }

    writeStorage(USERS_KEY, users);
    this.emit();
    return publicUser(record);
  }

  async deleteAccount(): Promise<void> {
    const session = readStorage<{ email?: string } | null>(SESSION_KEY, null);
    if (!session?.email) throw new Error('You are not signed in.');

    const users = this.users();
    delete users[session.email];
    writeStorage(USERS_KEY, users);
    removeStorage(SESSION_KEY);
    this.emit();
  }
}

/* --------------------------------------------------- SupabaseAuthProvider -- */

/** Minimal shape of the Supabase client this provider uses. */
interface SupabaseLike {
  auth: {
    getSession(): Promise<{ data: { session: { user: SupabaseUser } | null } }>;
    onAuthStateChange(cb: (event: string, session: { user: SupabaseUser } | null) => void): void;
    signUp(args: unknown): Promise<{ data: { user: SupabaseUser | null }; error: { message: string } | null }>;
    signInWithPassword(args: unknown): Promise<{ data: { user: SupabaseUser | null }; error: { message: string } | null }>;
    signOut(): Promise<unknown>;
    updateUser(args: unknown): Promise<{ data: { user: SupabaseUser | null }; error: { message: string } | null }>;
  };
}

interface SupabaseUser {
  id: string;
  email?: string;
  created_at?: string;
  user_metadata?: { name?: string };
}

export class SupabaseAuthProvider implements AuthProvider {
  readonly name = 'supabase';
  private listeners: ((user: User | null) => void)[] = [];
  private user: User | null = null;

  constructor(private client: SupabaseLike) {
    void client.auth.getSession().then((res) => {
      this.user = res.data.session ? this.map(res.data.session.user) : null;
      this.emit();
    });
    client.auth.onAuthStateChange((_event, session) => {
      this.user = session ? this.map(session.user) : null;
      this.emit();
    });
  }

  private map(u: SupabaseUser | null): User | null {
    if (!u) return null;
    return {
      id: u.id,
      email: u.email ?? '',
      name: u.user_metadata?.name ?? u.email ?? '',
      createdAt: u.created_at ?? ''
    };
  }

  private emit(): void {
    for (const listener of this.listeners) {
      try {
        listener(this.user);
      } catch {
        /* ignore */
      }
    }
  }

  onChange(listener: (user: User | null) => void): () => void {
    this.listeners.push(listener);
    listener(this.user);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  current(): User | null {
    return this.user;
  }

  async signUp(details: SignUpDetails): Promise<User> {
    const res = await this.client.auth.signUp({
      email: normaliseEmail(details.email),
      password: details.password,
      options: { data: { name: details.name } }
    });
    if (res.error) throw new Error(res.error.message);
    return this.map(res.data.user)!;
  }

  async signIn(details: Credentials): Promise<User> {
    const res = await this.client.auth.signInWithPassword({
      email: normaliseEmail(details.email),
      password: details.password
    });
    if (res.error) throw new Error(res.error.message);
    return this.map(res.data.user)!;
  }

  async signOut(): Promise<void> {
    await this.client.auth.signOut();
  }

  async updateProfile(updates: { name?: string }): Promise<User> {
    const res = await this.client.auth.updateUser({ data: { name: updates.name } });
    if (res.error) throw new Error(res.error.message);
    return this.map(res.data.user)!;
  }

  async deleteAccount(): Promise<void> {
    // Removing a user needs the service-role key, so it must happen server-side.
    throw new Error('Account deletion requires a server endpoint.');
  }
}

/* ----------------------------------------------------------------- setup -- */

interface RuntimeConfig {
  supabase?: { url: string; anonKey: string } | null;
}

declare global {
  interface Window {
    KITCHENLO_CONFIG?: RuntimeConfig;
    supabase?: { createClient(url: string, key: string): SupabaseLike };
  }
}

function createProvider(): AuthProvider {
  const config = window.KITCHENLO_CONFIG ?? {};
  const supabase = config.supabase;
  if (supabase?.url && supabase.anonKey && window.supabase) {
    try {
      return new SupabaseAuthProvider(window.supabase.createClient(supabase.url, supabase.anonKey));
    } catch {
      /* fall through to the local provider */
    }
  }
  return new LocalAuthProvider();
}

export const auth: AuthProvider = createProvider();
