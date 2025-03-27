"use server"

import { signIn, signOut } from '$root/auth';
import { getDb } from '$root/lib/adapters/mongodb';
import { AuthError, User } from 'next-auth';

export async function getUserByEmail(email: string): Promise<User | null> {
    try {
        const db = await getDb();
        const user = await db.collection('db_users').findOne({ email }) as User | null;
        return user;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export async function createUser(userData: Omit<User, 'id'>): Promise<User> {
    try {
        const db = await getDb();
        const result = await db.collection('db_users').insertOne(userData);
        return { ...userData, id: result.insertedId.toString() } as User;
    } catch (error) {
        console.error('Failed to create user:', error);
        throw new Error('Failed to create user.');
    }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function SignOut() {
  await signOut();
}