'use client';

import { use, useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { getLessonById } from '@/data/lessons';
import { submitPractice } from '@/lib/firestore-practice';
import BottomNav from '@/components/bottom-nav';

function PlusIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export default function SubmitPracticePage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = use(params);
  const lesson = getLessonById(lessonId);
  const { user, loading, refreshProfile } = useAuth();
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeSlot, setActiveSlot] = useState(0);
  const [photoFiles, setPhotoFiles] = useState<(File | null)[]>([null, null, null]);
  const [photoPreviews, setPhotoPreviews] = useState<(string | null)[]>([null, null, null]);
  const [whatWorked, setWhatWorked] = useState('');
  const [ideasForNextTime, setIdeasForNextTime] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
    if (!loading && (!lesson || !lesson.practicePrompt)) router.replace('/');
  }, [loading, user, lesson, router]);

  useEffect(() => {
    if (done) {
      const timer = setTimeout(() => router.replace('/'), 1600);
      return () => clearTimeout(timer);
    }
  }, [done, router]);

  function openSlot(index: number) {
    setActiveSlot(index);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhotoFiles(prev => { const next = [...prev]; next[activeSlot] = file; return next; });
    setPhotoPreviews(prev => { const next = [...prev]; next[activeSlot] = url; return next; });
  }

  async function handleSubmit() {
    if (!user || !photoFiles[0] || !lesson) return;
    setSubmitting(true);
    setError(null);
    try {
      const filesToUpload = photoFiles.filter((f): f is File => f !== null);
      await submitPractice(user.uid, lessonId, filesToUpload, whatWorked, ideasForNextTime);
      await refreshProfile();
      setDone(true);
    } catch (e) {
      console.error('[submit] error:', e);
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
      setSubmitting(false);
    }
  }

  if (loading || !user || !lesson || !lesson.practicePrompt) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: 'var(--primary)', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  if (done) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5 text-center" style={{ background: 'var(--bg)' }}>
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-2xl font-extrabold mb-2">Shot submitted!</h1>
        <div
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full mb-3"
          style={{ background: 'rgba(255,107,0,0.1)', border: '1.5px solid rgba(255,107,0,0.3)' }}
        >
          <span style={{ fontSize: 22, fontWeight: 900, color: 'var(--primary)' }}>+25 XP</span>
        </div>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>Taking you home…</p>
      </div>
    );
  }

  const filledCount = photoFiles.filter(Boolean).length;

  return (
    <div className="min-h-screen flex flex-col pb-24" style={{ background: 'var(--bg)' }}>
      {error && (
        <div
          className="fixed top-0 left-0 right-0 z-50 px-5 py-3 text-sm font-semibold text-center"
          style={{ background: '#DC2626', color: '#fff' }}
          onClick={() => setError(null)}
        >
          {error} (tap to dismiss)
        </div>
      )}

      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 flex items-center justify-center rounded-xl"
          style={{ background: 'var(--surface)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="flex-1">
          <p className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Review</p>
          <p className="text-sm font-bold truncate">{lesson.title}</p>
        </div>
      </div>

      <div className="flex-1 px-5 flex flex-col gap-5">
        {/* Challenge reminder */}
        <p className="text-sm" style={{ color: 'var(--muted)', lineHeight: 1.5 }}>
          {lesson.practicePrompt}
        </p>

        {/* Photo slots */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>Your photos</p>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>
              {filledCount > 0 ? `${filledCount} of 3` : 'up to 3 — first required'}
            </p>
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Top slot (large) */}
          <button
            onClick={() => openSlot(0)}
            className="w-full rounded-2xl overflow-hidden mb-2 transition-all active:scale-[0.98]"
            style={{
              aspectRatio: '16/9',
              background: 'var(--surface)',
              border: `2px ${photoPreviews[0] ? 'solid var(--primary)' : 'dashed var(--border)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {photoPreviews[0] ? (
              <img src={photoPreviews[0]} alt="Photo 1" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            ) : (
              <div className="flex flex-col items-center gap-1.5" style={{ color: 'var(--muted)' }}>
                <PlusIcon />
                <p className="text-xs font-semibold">Add first photo</p>
              </div>
            )}
          </button>

          {/* Bottom two slots */}
          <div className="grid grid-cols-2 gap-2">
            {[1, 2].map(i => (
              <button
                key={i}
                onClick={() => openSlot(i)}
                className="rounded-2xl overflow-hidden transition-all active:scale-[0.98]"
                style={{
                  aspectRatio: '1',
                  background: 'var(--surface)',
                  border: `2px ${photoPreviews[i] ? 'solid var(--primary)' : 'dashed var(--border)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: !photoFiles[0] ? 0.4 : 1,
                }}
                disabled={!photoFiles[0]}
              >
                {photoPreviews[i] ? (
                  <img src={photoPreviews[i]!} alt={`Photo ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                ) : (
                  <div className="flex flex-col items-center gap-1" style={{ color: 'var(--muted)' }}>
                    <PlusIcon />
                    <p className="text-xs font-semibold">Optional</p>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* What worked */}
        <div>
          <label className="block text-sm font-bold mb-2" style={{ color: 'var(--foreground)' }}>
            What worked?
          </label>
          <textarea
            value={whatWorked}
            onChange={e => setWhatWorked(e.target.value)}
            placeholder="What came together in this shot?"
            rows={3}
            className="w-full rounded-2xl p-4 text-sm resize-none outline-none"
            style={{
              background: 'var(--surface)',
              border: '1.5px solid var(--border)',
              color: 'var(--foreground)',
              fontFamily: 'inherit',
              lineHeight: 1.5,
            }}
          />
        </div>

        {/* Ideas for next time */}
        <div>
          <label className="block text-sm font-bold mb-2" style={{ color: 'var(--foreground)' }}>
            Ideas for next time
          </label>
          <textarea
            value={ideasForNextTime}
            onChange={e => setIdeasForNextTime(e.target.value)}
            placeholder="What would you try differently?"
            rows={3}
            className="w-full rounded-2xl p-4 text-sm resize-none outline-none"
            style={{
              background: 'var(--surface)',
              border: '1.5px solid var(--border)',
              color: 'var(--foreground)',
              fontFamily: 'inherit',
              lineHeight: 1.5,
            }}
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!photoFiles[0] || submitting}
          className="w-full py-4 rounded-2xl font-bold text-base mt-auto disabled:opacity-30 transition-opacity"
          style={{ background: 'var(--primary)', color: '#fff', boxShadow: '0 4px 0 #C45200' }}
        >
          {submitting ? `Uploading ${filledCount} photo${filledCount !== 1 ? 's' : ''}…` : 'Submit shot →'}
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
