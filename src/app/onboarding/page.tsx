'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { createUserProfile, CameraType } from '@/lib/firestore-users';

const CAMERA_OPTIONS: { id: CameraType; label: string; subtitle: string; emoji: string; accent: string; bg: string }[] = [
  {
    id: 'iphone',
    label: 'iPhone',
    subtitle: 'Use Apple\'s powerful built-in camera to its full potential',
    emoji: '📱',
    accent: '#1B9AE4',
    bg: '#EFF8FF',
  },
  {
    id: 'professional',
    label: 'Professional Camera',
    subtitle: 'DSLR, mirrorless, or cinema camera (Sony, Canon, Nikon…)',
    emoji: '🎥',
    accent: '#FF6B00',
    bg: '#FFF4EE',
  },
];

const INTERESTS = [
  { id: 'composition', label: 'Composition', emoji: '📐' },
  { id: 'portrait', label: 'Portrait', emoji: '🧑' },
  { id: 'street', label: 'Street', emoji: '🏙️' },
  { id: 'landscape', label: 'Landscape', emoji: '🏔️' },
  { id: 'color', label: 'Color & Light', emoji: '🌈' },
  { id: 'action', label: 'Action & Sports', emoji: '⚡' },
];

export default function OnboardingPage() {
  const { user, refreshProfile } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);
  const [cameraTypes, setCameraTypes] = useState<CameraType[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleInterest(id: string) {
    setInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  }

  function toggleCamera(id: CameraType) {
    setCameraTypes(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  }

  async function finish() {
    if (!user || cameraTypes.length === 0 || interests.length === 0) return;
    setSaving(true);
    setError(null);
    try {
      await createUserProfile(user.uid, {
        displayName: user.displayName ?? '',
        photoURL: user.photoURL ?? '',
        interests,
        cameraTypes,
      });
      await refreshProfile();
      router.replace('/');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col px-5 py-14" style={{ background: 'var(--bg)' }}>
      <div className="max-w-sm mx-auto w-full flex-1 flex flex-col">

        {/* Step indicators */}
        <div className="flex items-center gap-2 mb-10">
          {[1, 2].map(s => (
            <div
              key={s}
              style={{
                height: 4, flex: 1, borderRadius: 99,
                background: s <= step ? 'var(--primary)' : 'var(--border)',
                transition: 'background 0.3s',
              }}
            />
          ))}
        </div>

        {/* ── Step 1: Camera ── */}
        {step === 1 && (
          <>
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--primary)' }}>
                Step 1 of 2
              </p>
              <h1 className="text-2xl font-bold leading-snug mb-2">What do you shoot with?</h1>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>
                Select all that apply — you can pick both!
              </p>
            </div>

            <div className="flex flex-col gap-3 flex-1">
              {CAMERA_OPTIONS.map(opt => {
                const selected = cameraTypes.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    onClick={() => toggleCamera(opt.id)}
                    className="rounded-2xl p-5 text-left transition-all active:scale-[0.98]"
                    style={{
                      background: selected ? opt.bg : 'var(--surface)',
                      border: `2px solid ${selected ? opt.accent : 'var(--border)'}`,
                      boxShadow: selected ? `0 4px 16px ${opt.accent}22` : 'none',
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        style={{
                          width: 56, height: 56, borderRadius: 16, flexShrink: 0,
                          background: selected ? opt.accent : 'var(--surface-elevated)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 26,
                          transition: 'background 0.2s',
                        }}
                      >
                        {opt.emoji}
                      </div>
                      <div className="flex-1">
                        <p style={{ fontSize: 17, fontWeight: 800, color: selected ? opt.accent : 'var(--foreground)', marginBottom: 3 }}>
                          {opt.label}
                        </p>
                        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)', lineHeight: 1.4 }}>
                          {opt.subtitle}
                        </p>
                      </div>
                      <div
                        style={{
                          width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                          border: `2px solid ${selected ? opt.accent : 'var(--border)'}`,
                          background: selected ? opt.accent : 'transparent',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'all 0.15s',
                        }}
                      >
                        {selected && (
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={cameraTypes.length === 0}
              className="mt-6 w-full py-4 rounded-2xl font-bold transition-opacity disabled:opacity-30"
              style={{ background: 'var(--primary)', color: '#fff' }}
            >
              Continue →
            </button>
          </>
        )}

        {/* ── Step 2: Interests ── */}
        {step === 2 && (
          <>
            <div className="mb-8">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-1.5 mb-4"
                style={{ color: 'var(--muted)', fontSize: 14, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                Back
              </button>
              <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--primary)' }}>
                Step 2 of 2
              </p>
              <h1 className="text-2xl font-bold leading-snug">What are you most excited to learn?</h1>
              <p className="text-sm mt-2" style={{ color: 'var(--muted)' }}>
                Pick at least one to personalize your experience.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 flex-1">
              {INTERESTS.map(interest => {
                const active = interests.includes(interest.id);
                return (
                  <button
                    key={interest.id}
                    onClick={() => toggleInterest(interest.id)}
                    className="rounded-2xl p-5 text-left transition-all active:scale-95"
                    style={{
                      background: active ? 'var(--primary)' : 'var(--surface)',
                      color: active ? '#fff' : 'var(--foreground)',
                      border: `2px solid ${active ? 'var(--primary)' : 'transparent'}`,
                    }}
                  >
                    <div className="text-3xl mb-2">{interest.emoji}</div>
                    <div className="font-semibold text-sm">{interest.label}</div>
                  </button>
                );
              })}
            </div>

            {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

            <button
              onClick={finish}
              disabled={interests.length === 0 || saving}
              className="mt-6 w-full py-4 rounded-2xl font-bold transition-opacity disabled:opacity-30"
              style={{ background: 'var(--primary)', color: '#fff' }}
            >
              {saving ? 'Saving…' : "Let's go →"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
