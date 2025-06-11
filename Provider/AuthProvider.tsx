import React, { createContext, useContext, useEffect, useState } from "react";

import { Session, User } from "@supabase/supabase-js";
import { ActivityIndicator, View } from "react-native";
import { supabase } from "~/utils/supabase";

type AuthContextType = {
  isAuthenticated: boolean;
  session: Session | null;
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  session: null,
  user: null,
  loading: true,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isloading, setIsLoading] = useState(true);
  const isAuthenticated = !!session;

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setIsLoading(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if(isloading){
    return (
      <View className="items-center justify-center flex-1">
        <ActivityIndicator size='large'/>
      </View>
    )
  }

  const signOut = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, session, user, loading: isloading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);