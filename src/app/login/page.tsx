'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Capacitor } from '@capacitor/core';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { signInWithGoogle, signInWithApple } from '@/lib/social-auth';
import { getUserProfile, createUserProfile } from '@/lib/firestore-users';
import { useAuth } from '@/context/auth-context';

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  // Sign in with Apple is required by Apple in the native app; on the web it's
  // optional and not configured yet, so only surface it inside the app shell.
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    setIsNative(Capacitor.isNativePlatform());
  }, []);

  useEffect(() => {
    if (!loading && user) router.replace('/');
  }, [loading, user, router]);

  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      if (mode === 'signup') {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: name });
        await createUserProfile(cred.user.uid, { displayName: name, photoURL: '' });
        router.replace('/onboarding');
      } else {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        const profile = await getUserProfile(cred.user.uid);
        router.replace(profile ? '/' : '/onboarding');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.';
      setError(msg.replace('Firebase: ', '').replace(/\(auth\/.*\)\.?/, '').trim());
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSocial(kind: 'google' | 'apple') {
    setError('');
    setSubmitting(true);
    try {
      const cred = kind === 'google' ? await signInWithGoogle() : await signInWithApple();
      const profile = await getUserProfile(cred.user.uid);
      if (!profile) {
        await createUserProfile(cred.user.uid, {
          displayName: cred.user.displayName ?? '',
          photoURL: cred.user.photoURL ?? '',
        });
        router.replace('/onboarding');
      } else {
        router.replace('/');
      }
    } catch (err: unknown) {
      // A user cancelling the native sheet isn't an error worth showing.
      const msg = err instanceof Error ? err.message : 'Something went wrong.';
      if (/cancel/i.test(msg)) { setSubmitting(false); return; }
      setError(msg.replace('Firebase: ', '').trim());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-5"
      style={{ background: 'var(--bg)' }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-3">📷</div>
          <h1 className="text-3xl font-bold tracking-tight">Shotly</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
            Learn photography, one shot at a time.
          </p>
        </div>

        {/* Tab toggle */}
        <div
          className="flex rounded-xl p-1 mb-6"
          style={{ background: 'var(--surface)' }}
        >
          {(['login', 'signup'] as const).map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(''); }}
              className="flex-1 py-2 text-sm font-semibold rounded-lg transition-colors capitalize"
              style={{
                background: mode === m ? 'var(--primary)' : 'transparent',
                color: mode === m ? '#0A0A0A' : 'var(--muted)',
              }}
            >
              {m === 'login' ? 'Log in' : 'Sign up'}
            </button>
          ))}
        </div>

        <form onSubmit={handleEmailAuth} className="space-y-3">
          {mode === 'signup' && (
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 ring-amber-400"
              style={{ background: 'var(--surface)', color: 'var(--foreground)' }}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 ring-amber-400"
            style={{ background: 'var(--surface)', color: 'var(--foreground)' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 ring-amber-400"
            style={{ background: 'var(--surface)', color: 'var(--foreground)' }}
          />
          {error && <p className="text-sm" style={{ color: 'var(--danger)' }}>{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl font-bold text-sm transition-opacity disabled:opacity-50"
            style={{ background: 'var(--primary)', color: '#0A0A0A' }}
          >
            {submitting ? 'Loading…' : mode === 'login' ? 'Log in' : 'Create account'}
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          <span className="text-xs" style={{ color: 'var(--muted)' }}>or</span>
          <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
        </div>

        <div className="space-y-3">
          <button
            onClick={() => handleSocial('google')}
            disabled={submitting}
            className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-opacity disabled:opacity-50"
            style={{ background: 'var(--surface)', color: 'var(--foreground)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {isNative && (
          <button
            onClick={() => handleSocial('apple')}
            disabled={submitting}
            className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-opacity disabled:opacity-50"
            style={{ background: '#000', color: '#fff' }}
          >
            <svg width="16" height="18" viewBox="0 0 384 512" fill="#fff" aria-hidden="true">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
            </svg>
            Continue with Apple
          </button>
          )}
        </div>
      </div>
    </div>
  );
}
