'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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
  const [selected, setSelected] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  function toggle(id: string) {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  }

  async function finish() {
    if (!user || selected.length === 0) return;
    setSaving(true);
    await updateDoc(doc(db, 'users', user.uid), { interests: selected });
    await refreshProfile();
    router.replace('/');
  }

  return (
    <div
      className="min-h-screen flex flex-col px-5 py-14"
      style={{ background: 'var(--bg)' }}
    >
      <div className="max-w-sm mx-auto w-full flex-1 flex flex-col">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--primary)' }}>
            Welcome to Shotly
          </p>
          <h1 className="text-2xl font-bold leading-snug">What are you most excited to learn?</h1>
          <p className="text-sm mt-2" style={{ color: 'var(--muted)' }}>
            Pick at least one to personalize your experience.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 flex-1">
          {INTERESTS.map(interest => {
            const active = selected.includes(interest.id);
            return (
              <button
                key={interest.id}
                onClick={() => toggle(interest.id)}
                className="rounded-2xl p-5 text-left transition-all active:scale-95"
                style={{
                  background: active ? 'var(--primary)' : 'var(--surface)',
                  color: active ? '#0A0A0A' : 'var(--foreground)',
                  border: `2px solid ${active ? 'var(--primary)' : 'transparent'}`,
                }}
              >
                <div className="text-3xl mb-2">{interest.emoji}</div>
                <div className="font-semibold text-sm">{interest.label}</div>
              </button>
            );
          })}
        </div>

        <button
          onClick={finish}
          disabled={selected.length === 0 || saving}
          className="mt-6 w-full py-4 rounded-2xl font-bold transition-opacity disabled:opacity-30"
          style={{ background: 'var(--primary)', color: '#0A0A0A' }}
        >
          {saving ? 'Saving…' : "Let's go →"}
        </button>
      </div>
    </div>
  );
}
