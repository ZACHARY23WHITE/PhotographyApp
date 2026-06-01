'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { updateProfile, updateEmail } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, storage, db } from '@/lib/firebase';
import { useAuth } from '@/context/auth-context';
import BottomNav from '@/components/bottom-nav';
import XpBar from '@/components/xp-bar';
import StreakBadge from '@/components/streak-badge';
import { LESSONS, CATEGORIES, getLessonById } from '@/data/lessons';
import { updateCameraTypes, CameraType } from '@/lib/firestore-users';
import { getUserPracticeSubmissions, PracticeSubmission } from '@/lib/firestore-practice';

export default function ProfilePage() {
  const { user, profile, loading, signOut, refreshProfile } = useAuth();
  const router = useRouter();

  const [editing, setEditing] = useState(false);
  const [savingCamera, setSavingCamera] = useState(false);
  const [practiceSubmissions, setPracticeSubmissions] = useState<PracticeSubmission[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;
    getUserPracticeSubmissions(user.uid).then(setPracticeSubmissions).catch(() => {});
  }, [user]);

  function startEditing() {
    setName(profile?.displayName ?? '');
    setEmail(user?.email ?? '');
    setPhotoPreview(null);
    setPhotoFile(null);
    setError(null);
    setEditing(true);
  }

  function cancelEditing() {
    setEditing(false);
    setError(null);
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  async function saveProfile() {
    if (!user) return;
    setSaving(true);
    setError(null);
    try {
      let photoURL = profile?.photoURL ?? '';

      if (photoFile) {
        console.log('[profile] uploading photo…');
        const storageRef = ref(storage, `avatars/${user.uid}`);
        await uploadBytes(storageRef, photoFile);
        console.log('[profile] upload done, getting URL…');
        photoURL = await getDownloadURL(storageRef);
        console.log('[profile] photoURL:', photoURL);
      }

      console.log('[profile] updating auth profile…');
      await updateProfile(user, { displayName: name, photoURL });
      console.log('[profile] updating firestore…');
      await updateDoc(doc(db, 'users', user.uid), { displayName: name, photoURL });

      if (email !== user.email) {
        console.log('[profile] updating email…');
        await updateEmail(user, email);
      }

      console.log('[profile] refreshing profile…');
      await refreshProfile();
      setEditing(false);
    } catch (e) {
      console.error('[profile] save error:', e);
      if (e instanceof Error && e.message.includes('requires-recent-login')) {
        setError('Please sign out and sign back in before changing your email.');
      } else {
        setError(e instanceof Error ? e.message : 'Failed to save. Please try again.');
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'var(--primary)', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  const completedCount = profile.completedLessons.length;
  const totalLessons = LESSONS.length;
  const avatarSrc = photoPreview ?? (profile.photoURL || null);
  const nextLesson = LESSONS.find(l => !profile.completedLessons.includes(l.id));

  return (
    <div className="min-h-screen pb-24" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <div className="px-5 pt-14 pb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Profile</h1>
        <button
          onClick={async () => { await signOut(); router.replace('/login'); }}
          className="text-sm px-3 py-1.5 rounded-lg"
          style={{ color: 'var(--muted)', background: 'var(--surface)' }}
        >
          Sign out
        </button>
      </div>

      <div className="px-5 space-y-5">
        {/* Avatar + identity */}
        <div className="rounded-2xl p-5" style={{ background: 'var(--surface)' }}>
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              {avatarSrc ? (
                <img
                  src={avatarSrc}
                  alt="Profile"
                  className="w-16 h-16 rounded-2xl object-cover"
                />
              ) : (
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold"
                  style={{ background: 'var(--primary)', color: '#fff' }}
                >
                  {profile.displayName.charAt(0).toUpperCase()}
                </div>
              )}
              {editing && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 rounded-2xl flex items-center justify-center"
                  style={{ background: 'rgba(0,0,0,0.45)' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                    <circle cx="12" cy="13" r="4"/>
                  </svg>
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onFileChange}
              />
            </div>

            {/* Name / email */}
            <div className="flex-1 min-w-0">
              {editing ? (
                <div className="space-y-2">
                  <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Display name"
                    className="w-full px-3 py-2 rounded-xl text-sm font-semibold outline-none"
                    style={{ background: 'var(--bg)', color: 'var(--foreground)' }}
                  />
                  <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email address"
                    type="email"
                    className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--bg)', color: 'var(--foreground)' }}
                  />
                </div>
              ) : (
                <>
                  <p className="font-bold text-lg truncate">{profile.displayName}</p>
                  <p className="text-sm truncate" style={{ color: 'var(--muted)' }}>{user?.email}</p>
                  <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>Level {profile.level} Photographer</p>
                </>
              )}
            </div>
          </div>

          {error && (
            <p className="mt-3 text-sm text-red-500">{error}</p>
          )}

          <div className="mt-4 flex gap-2">
            {editing ? (
              <>
                <button
                  onClick={saveProfile}
                  disabled={saving}
                  className="flex-1 py-2.5 rounded-xl text-sm font-bold disabled:opacity-50"
                  style={{ background: 'var(--primary)', color: '#fff' }}
                >
                  {saving ? 'Saving…' : 'Save'}
                </button>
                <button
                  onClick={cancelEditing}
                  disabled={saving}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold"
                  style={{ background: 'var(--bg)', color: 'var(--muted)' }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={startEditing}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: 'var(--bg)', color: 'var(--foreground)' }}
              >
                Edit profile
              </button>
            )}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl p-4 text-center" style={{ background: 'var(--surface)' }}>
            <p className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>{profile.xp.toLocaleString()}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Total XP</p>
          </div>
          <div className="rounded-2xl p-4 text-center" style={{ background: 'var(--surface)' }}>
            <div className="flex justify-center">
              <StreakBadge streak={profile.streak} size="sm" />
            </div>
            <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Streak</p>
          </div>
          <div className="rounded-2xl p-4 text-center" style={{ background: 'var(--surface)' }}>
            <p className="text-2xl font-bold">{completedCount}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Lessons</p>
          </div>
        </div>

        {/* XP progress */}
        <div className="rounded-2xl p-4" style={{ background: 'var(--surface)' }}>
          <p className="font-semibold text-sm mb-3">Progress to Level {profile.level + 1}</p>
          <XpBar xp={profile.xp} />
        </div>

        {/* My Camera */}
        <div>
          <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
            My Camera
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {([
              { id: 'iphone' as CameraType, label: 'iPhone', subtitle: 'Built-in camera', emoji: '📱', accent: '#1B9AE4', bg: '#EFF8FF' },
              { id: 'professional' as CameraType, label: 'Professional', subtitle: 'DSLR / Mirrorless', emoji: '🎥', accent: '#FF6B00', bg: '#FFF4EE' },
            ] as const).map(opt => {
              const selected = (profile.cameraTypes ?? []).includes(opt.id);
              return (
                <button
                  key={opt.id}
                  disabled={savingCamera}
                  onClick={async () => {
                    if (savingCamera || !user) return;
                    const current = profile.cameraTypes ?? [];
                    const next = selected
                      ? current.filter(c => c !== opt.id)
                      : [...current, opt.id];
                    setSavingCamera(true);
                    await updateCameraTypes(user.uid, next);
                    await refreshProfile();
                    setSavingCamera(false);
                  }}
                  className="rounded-2xl p-4 text-left transition-all active:scale-[0.97] disabled:opacity-60"
                  style={{
                    background: selected ? opt.bg : 'var(--surface)',
                    border: `2px solid ${selected ? opt.accent : 'var(--border)'}`,
                    cursor: selected ? 'default' : 'pointer',
                  }}
                >
                  <div
                    style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: selected ? opt.accent : 'var(--surface-elevated)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 22, marginBottom: 10,
                    }}
                  >
                    {opt.emoji}
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 800, color: selected ? opt.accent : 'var(--foreground)', marginBottom: 2 }}>
                    {opt.label}
                  </p>
                  <p style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--muted)' }}>
                    {opt.subtitle}
                  </p>
                  {selected && (
                    <div className="flex items-center gap-1 mt-2">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={opt.accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <span style={{ fontSize: 11, fontWeight: 700, color: opt.accent }}>Selected</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Up Next */}
        {nextLesson && (
          <div>
            <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
              Up Next
            </h2>
            <Link href={`/learn/${nextLesson.id}`}>
              <div
                className="rounded-2xl p-5 flex items-center gap-4 active:scale-[0.98] transition-transform cursor-pointer"
                style={{ background: 'var(--primary)', color: '#fff' }}
              >
                <div className="text-4xl">
                  {CATEGORIES.find(c => c.id === nextLesson.category)?.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-0.5">
                    {nextLesson.category}
                  </p>
                  <p className="font-bold text-lg leading-tight">{nextLesson.title}</p>
                  <p className="text-sm opacity-75 mt-0.5">{nextLesson.estimatedMinutes} min · {nextLesson.xpReward} XP</p>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </Link>
          </div>
        )}

        {completedCount === LESSONS.length && (
          <div className="rounded-2xl p-5 text-center" style={{ background: 'var(--surface)' }}>
            <p className="text-3xl mb-2">🏆</p>
            <p className="font-bold">All lessons complete!</p>
            <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>More lessons coming soon.</p>
          </div>
        )}

        {/* Categories overview */}
        <div>
          <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
            Categories
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {CATEGORIES.map(cat => {
              const catLessons = LESSONS.filter(l => l.category === cat.id);
              const catCompleted = catLessons.filter(l => profile.completedLessons.includes(l.id)).length;
              const pct = Math.round((catCompleted / catLessons.length) * 100);
              return (
                <Link key={cat.id} href="/">
                  <div
                    className="rounded-2xl p-4 active:scale-[0.97] transition-transform cursor-pointer"
                    style={{ background: 'var(--surface)' }}
                  >
                    <div className="text-2xl mb-2">{cat.emoji}</div>
                    <p className="font-semibold text-sm">{cat.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                      {catCompleted}/{catLessons.length} done
                    </p>
                    <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ background: 'var(--surface-elevated)' }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${pct}%`, background: 'var(--primary)' }}
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Category progress */}
        <div>
          <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
            Skills
          </h2>
          <div className="space-y-3">
            {CATEGORIES.map(cat => {
              const catLessons = LESSONS.filter(l => l.category === cat.id);
              const catCompleted = catLessons.filter(l => profile.completedLessons.includes(l.id)).length;
              const pct = catLessons.length > 0 ? (catCompleted / catLessons.length) * 100 : 0;

              return (
                <div key={cat.id} className="rounded-2xl p-4" style={{ background: 'var(--surface)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span>{cat.emoji}</span>
                      <span className="font-semibold text-sm">{cat.label}</span>
                    </div>
                    <span className="text-xs" style={{ color: 'var(--muted)' }}>
                      {catCompleted}/{catLessons.length}
                    </span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--surface-elevated)' }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, background: pct === 100 ? 'var(--success)' : 'var(--primary)' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* My Practice */}
        <div>
          <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
            My Practice
          </h2>
          {practiceSubmissions.length === 0 ? (
            <div
              className="rounded-2xl p-5 text-center"
              style={{ background: 'var(--surface)', border: '1.5px dashed var(--border)' }}
            >
              <p className="text-2xl mb-2">📷</p>
              <p className="font-semibold text-sm mb-1">No practice shots yet</p>
              <p className="text-xs" style={{ color: 'var(--muted)', lineHeight: 1.5 }}>
                Complete a lesson, then come back to practice and upload your first shot.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {practiceSubmissions.map(sub => {
                const subLesson = getLessonById(sub.lessonId);
                const firstPhoto = sub.photoURLs?.[0];
                const extraCount = (sub.photoURLs?.length ?? 0) - 1;
                if (!firstPhoto) return null;
                return (
                  <Link key={sub.id} href={`/practice/${sub.lessonId}`}>
                    <div
                      className="rounded-2xl overflow-hidden active:scale-[0.97] transition-transform cursor-pointer"
                      style={{ background: 'var(--surface)' }}
                    >
                      <div style={{ position: 'relative' }}>
                        <img
                          src={firstPhoto}
                          alt={subLesson?.title ?? sub.lessonId}
                          style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' }}
                        />
                        {extraCount > 0 && (
                          <div
                            style={{
                              position: 'absolute', bottom: 6, right: 6,
                              background: 'rgba(0,0,0,0.55)', borderRadius: 8,
                              padding: '2px 7px',
                            }}
                          >
                            <p style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>+{extraCount}</p>
                          </div>
                        )}
                      </div>
                      <div className="px-3 py-2">
                        <p className="text-xs font-bold truncate" style={{ color: 'var(--foreground)' }}>
                          {subLesson?.title ?? sub.lessonId}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Interests */}
        {profile.interests.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
              Interests
            </h2>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map(interest => (
                <span
                  key={interest}
                  className="px-3 py-1.5 rounded-full text-sm font-medium capitalize"
                  style={{ background: 'var(--surface)', color: 'var(--muted-light)' }}
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Overall progress */}
        <div className="rounded-2xl p-4" style={{ background: 'var(--surface)' }}>
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-sm">Overall completion</p>
            <p className="text-sm font-bold" style={{ color: 'var(--primary)' }}>
              {Math.round((completedCount / totalLessons) * 100)}%
            </p>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--surface-elevated)' }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${(completedCount / totalLessons) * 100}%`,
                background: 'var(--primary)',
              }}
            />
          </div>
          <p className="text-xs mt-2" style={{ color: 'var(--muted)' }}>
            {completedCount} of {totalLessons} lessons complete
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
