import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { User } from '@/types'
import toast from 'react-hot-toast'

interface AuthState {
  user: User | null
  loading: boolean
  initialized: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  initialize: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      initialized: false,

      initialize: () => {
        if (get().initialized) return

        onAuthStateChanged(auth, async (firebaseUser) => {
          if (firebaseUser) {
            const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
            if (userDoc.exists()) {
              const userData = userDoc.data()
              set({
                user: {
                  uid: firebaseUser.uid,
                  email: firebaseUser.email!,
                  name: userData.name,
                  phone: userData.phone,
                  role: userData.role || 'customer',
                  createdAt: userData.createdAt?.toDate() || new Date(),
                },
                loading: false,
                initialized: true,
              })
            } else {
              // Create user document if it doesn't exist
              const userData = {
                name: firebaseUser.displayName || '',
                email: firebaseUser.email!,
                phone: '',
                role: 'customer' as const,
                createdAt: new Date(),
              }
              
              await setDoc(doc(db, 'users', firebaseUser.uid), userData)
              
              set({
                user: {
                  uid: firebaseUser.uid,
                  ...userData,
                },
                loading: false,
                initialized: true,
              })
            }
          } else {
            set({ user: null, loading: false, initialized: true })
          }
        })
      },

      signIn: async (email: string, password: string) => {
        try {
          set({ loading: true })
          await signInWithEmailAndPassword(auth, email, password)
          toast.success('Welcome back!')
        } catch (error: any) {
          toast.error(error.message || 'Failed to sign in')
          throw error
        } finally {
          set({ loading: false })
        }
      },

      signUp: async (email: string, password: string, name: string) => {
        try {
          set({ loading: true })
          const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password)
          
          const userData = {
            name,
            email,
            phone: '',
            role: 'customer' as const,
            createdAt: new Date(),
          }
          
          await setDoc(doc(db, 'users', firebaseUser.uid), userData)
          toast.success('Account created successfully!')
        } catch (error: any) {
          toast.error(error.message || 'Failed to create account')
          throw error
        } finally {
          set({ loading: false })
        }
      },

      signInWithGoogle: async () => {
        try {
          set({ loading: true })
          const provider = new GoogleAuthProvider()
          await signInWithPopup(auth, provider)
          toast.success('Welcome!')
        } catch (error: any) {
          toast.error(error.message || 'Failed to sign in with Google')
          throw error
        } finally {
          set({ loading: false })
        }
      },

      logout: async () => {
        try {
          await signOut(auth)
          set({ user: null })
          toast.success('Signed out successfully')
        } catch (error: any) {
          toast.error('Failed to sign out')
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
)
