// Cross-platform social sign-in.
//
// In a native Capacitor shell, browser popups don't work, so we use the
// @capacitor-firebase/authentication plugin to run the native Google / Apple
// flow, then hand the returned OAuth credential to the Firebase JS SDK
// (skipNativeAuth keeps the JS SDK as the single source of truth that the rest
// of the app already reads via auth-context). On the web we keep the popup.
import { Capacitor } from '@capacitor/core';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signInWithCredential,
  type UserCredential,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

const isNative = Capacitor.isNativePlatform();

export async function signInWithGoogle(): Promise<UserCredential> {
  if (isNative) {
    const result = await FirebaseAuthentication.signInWithGoogle({ skipNativeAuth: true });
    const credential = GoogleAuthProvider.credential(
      result.credential?.idToken,
      result.credential?.accessToken,
    );
    return signInWithCredential(auth, credential);
  }
  return signInWithPopup(auth, new GoogleAuthProvider());
}

export async function signInWithApple(): Promise<UserCredential> {
  if (isNative) {
    const result = await FirebaseAuthentication.signInWithApple({ skipNativeAuth: true });
    const provider = new OAuthProvider('apple.com');
    const credential = provider.credential({
      idToken: result.credential?.idToken,
      rawNonce: result.credential?.nonce,
    });
    return signInWithCredential(auth, credential);
  }
  const provider = new OAuthProvider('apple.com');
  provider.addScope('email');
  provider.addScope('name');
  return signInWithPopup(auth, provider);
}
