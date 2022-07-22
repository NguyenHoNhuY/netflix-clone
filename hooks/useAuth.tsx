import React, { createContext, useEffect, useMemo, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { auth } from '@/utils/firebase';

interface IAuth {
    user: User | null;
    signUp: (email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    error: string | null;
    loading: boolean;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

// todo create a context

const AuthContext = createContext<IAuth>({
    user: null,
    signUp: async () => {},
    signIn: async () => {},
    logout: async () => {},
    error: null,
    loading: false,
});

// * component AuthProvider
export const AuhtProvider = ({ children }: AuthProviderProps) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState(null);
    const [innitialLoading, setInnitialLoading] = useState(true);
    const router = useRouter();

    // todo check user logined
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                //todo logged in
                setUser(user);
                setLoading(false);
            } else {
                //todo not logged in
                setUser(null);
                setLoading(true);
                router.push('/login');
            }
            setInnitialLoading(false);
        });
    }, [auth]);

    const signUp = async (email: string, password: string) => {
        setLoading(true);

        await createUserWithEmailAndPassword(auth, email, password)
            .then((UserCredential) => {
                setUser(UserCredential.user);
                router.push('/');
                setLoading(false);
            })
            .catch((error) => {
                alert(error.message);
            })
            .finally(() => setLoading(false));
    };

    const signIn = async (email: string, password: string) => {
        setLoading(true);

        await signInWithEmailAndPassword(auth, email, password)
            .then((UserCredential) => {
                setUser(UserCredential.user);
                router.push('/');
                setLoading(false);
            })
            .catch((error) => {
                alert(error.message);
            })
            .finally(() => setLoading(false));
    };

    const logout = async () => {
        setLoading(true);

        await signOut(auth)
            .then(() => {
                setUser(null);
            })
            .catch((error) => {
                alert(error.message);
            })
            .finally(() => setLoading(false));
    };

    const memoedValue = useMemo(
        () => ({
            user,
            signUp,
            signIn,
            logout,
            error,
            loading,
        }),
        [user, loading, error],
    );

    return (
        <AuthContext.Provider value={memoedValue}>
            {!innitialLoading && children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
}
