import {
  collection,
  addDoc,
  query,
  where,
  limit,
  getDocs,
  serverTimestamp,
  increment,
  updateDoc,
  doc,
  arrayUnion,
  getDoc,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebase';
import { levelFromXp } from './firestore-users';

const PRACTICE_XP = 25;

export interface PracticeSubmission {
  id: string;
  uid: string;
  lessonId: string;
  photoURLs: string[];
  whatWorked: string;
  ideasForNextTime: string;
  submittedAt: unknown;
  xpAwarded: number;
}

export async function submitPractice(
  uid: string,
  lessonId: string,
  photoFiles: File[],
  whatWorked: string,
  ideasForNextTime: string,
): Promise<void> {
  console.log('[practice] uploading photos to Storage…');
  const photoURLs: string[] = [];
  for (let i = 0; i < photoFiles.length; i++) {
    const storageRef = ref(storage, `practice/${uid}/${lessonId}/${i}`);
    const snap = await uploadBytes(storageRef, photoFiles[i]);
    const url = await getDownloadURL(snap.ref);
    photoURLs.push(url);
    console.log(`[practice] photo ${i + 1}/${photoFiles.length} uploaded`);
  }

  console.log('[practice] writing to Firestore…');
  await addDoc(collection(db, 'practice'), {
    uid,
    lessonId,
    photoURLs,
    whatWorked,
    ideasForNextTime,
    submittedAt: serverTimestamp(),
    xpAwarded: PRACTICE_XP,
  });

  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  const currentXp: number = userSnap.exists() ? (userSnap.data().xp ?? 0) : 0;
  const newXp = currentXp + PRACTICE_XP;
  const today = new Date().toDateString();

  await updateDoc(userRef, {
    xp: increment(PRACTICE_XP),
    practiceXp: increment(PRACTICE_XP),
    level: levelFromXp(newXp),
    practicedLessons: arrayUnion(lessonId),
    lastActiveDate: today,
  });
  console.log('[practice] done ✓');
}

export async function getUserPracticeSubmissions(uid: string): Promise<PracticeSubmission[]> {
  const q = query(
    collection(db, 'practice'),
    where('uid', '==', uid),
    limit(20),
  );
  const snap = await getDocs(q);
  const submissions = snap.docs.map(d => {
    const data = d.data();
    // backwards compat: old docs stored photoURL (string) instead of photoURLs (array)
    const photoURLs: string[] = data.photoURLs ?? (data.photoURL ? [data.photoURL] : []);
    return { id: d.id, ...data, photoURLs } as PracticeSubmission;
  });
  return submissions.sort((a, b) => {
    const aTime = (a.submittedAt as { seconds?: number })?.seconds ?? 0;
    const bTime = (b.submittedAt as { seconds?: number })?.seconds ?? 0;
    return bTime - aTime;
  });
}
