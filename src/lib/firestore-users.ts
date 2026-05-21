import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface UserProfile {
  uid: string;
  displayName: string;
  photoURL: string;
  bio: string;
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string;
  interests: string[];
  completedLessons: string[];
  createdAt: unknown;
}

export function xpForLevel(level: number): number {
  return level * 500;
}

export function levelFromXp(xp: number): number {
  return Math.floor(xp / 500) + 1;
}

const profileDefaults: Omit<UserProfile, 'uid' | 'createdAt'> = {
  displayName: '',
  photoURL: '',
  bio: '',
  xp: 0,
  level: 1,
  streak: 0,
  lastActiveDate: '',
  interests: [],
  completedLessons: [],
};

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, 'users', uid));
  if (!snap.exists()) return null;
  return { ...profileDefaults, uid, ...snap.data() } as UserProfile;
}

export async function createUserProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
  await setDoc(doc(db, 'users', uid), {
    uid,
    displayName: data.displayName ?? '',
    photoURL: data.photoURL ?? '',
    bio: '',
    xp: 0,
    level: 1,
    streak: 0,
    lastActiveDate: '',
    interests: data.interests ?? [],
    completedLessons: [],
    createdAt: serverTimestamp(),
    ...data,
  });
}

export async function completeLesson(uid: string, lessonId: string, xpReward: number): Promise<void> {
  const profile = await getUserProfile(uid);
  if (!profile) return;
  if (profile.completedLessons.includes(lessonId)) return;

  const today = new Date().toDateString();
  const wasActiveYesterday = profile.lastActiveDate === new Date(Date.now() - 86400000).toDateString();
  const newStreak = wasActiveYesterday || profile.lastActiveDate === today ? profile.streak + 1 : 1;
  const newXp = profile.xp + xpReward;

  await updateDoc(doc(db, 'users', uid), {
    xp: newXp,
    level: levelFromXp(newXp),
    streak: newStreak,
    lastActiveDate: today,
    completedLessons: [...profile.completedLessons, lessonId],
  });
}
