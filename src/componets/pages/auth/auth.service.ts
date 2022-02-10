import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export const logIn = async (auth: Auth, email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signUp = async (auth: Auth, email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};
