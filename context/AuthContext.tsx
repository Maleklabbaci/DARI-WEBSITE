
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserType } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: any) => Promise<void>;
  logout: () => void;
  updateBalance: (amount: number) => void;
  updateSubscription: (type: 'free' | 'premium' | 'ultime') => void;
  updateProfile: (data: Partial<User>) => void;
  incrementPhoneUnlocks: () => boolean; // Returns true if free, false if needs payment
  useBoost: () => boolean; // Returns true if boost used from sub, false if needs payment
  stats: {
    boostsRemaining: number;
    phoneUnlocksToday: number;
  };
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    boostsRemaining: 0,
    phoneUnlocksToday: 0
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('dari_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      // Mock loading subscription stats
      if (parsedUser.subscription === 'premium') setStats(s => ({ ...s, boostsRemaining: 2 }));
      if (parsedUser.subscription === 'ultime') setStats(s => ({ ...s, boostsRemaining: 10 }));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email && password.length >= 6) {
          const mockUser: User = {
            id: 'u123',
            name: email.split('@')[0],
            email: email,
            type: 'individual',
            balance: 1500,
            phone: '0550000000',
            subscription: 'free'
          };
          setUser(mockUser);
          localStorage.setItem('dari_user', JSON.stringify(mockUser));
          resolve();
        } else {
          reject(new Error("Identifiants incorrects"));
        }
      }, 800);
    });
  };

  const signup = async (userData: any) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: 'u' + Math.random().toString(36).substr(2, 9),
          name: userData.type === 'agency' ? userData.agencyName : userData.fullName,
          email: userData.email,
          type: userData.type,
          balance: 1000, 
          phone: userData.phone,
          subscription: 'free'
        };
        setUser(newUser);
        localStorage.setItem('dari_user', JSON.stringify(newUser));
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dari_user');
  };

  const updateBalance = (amount: number) => {
    if (user) {
      const updatedUser = { ...user, balance: user.balance + amount };
      setUser(updatedUser);
      localStorage.setItem('dari_user', JSON.stringify(updatedUser));
    }
  };

  const updateSubscription = (type: 'free' | 'premium' | 'ultime') => {
    if (user) {
      const updatedUser = { ...user, subscription: type };
      setUser(updatedUser);
      localStorage.setItem('dari_user', JSON.stringify(updatedUser));
      
      // Update simulated limits
      if (type === 'premium') setStats(s => ({ ...s, boostsRemaining: 2 }));
      else if (type === 'ultime') setStats(s => ({ ...s, boostsRemaining: 10 }));
      else setStats(s => ({ ...s, boostsRemaining: 0 }));
    }
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('dari_user', JSON.stringify(updatedUser));
    }
  };

  const incrementPhoneUnlocks = () => {
    if (user?.subscription !== 'free') return true; // Unlimited
    if (stats.phoneUnlocksToday < 3) {
      setStats(s => ({ ...s, phoneUnlocksToday: s.phoneUnlocksToday + 1 }));
      return true; // Use free daily slot
    }
    return false; // Requires payment
  };

  const useBoost = () => {
    if (stats.boostsRemaining > 0) {
      setStats(s => ({ ...s, boostsRemaining: s.boostsRemaining - 1 }));
      return true; // Used included boost
    }
    return false; // Requires payment
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      signup, 
      logout, 
      updateBalance, 
      updateSubscription, 
      updateProfile,
      incrementPhoneUnlocks,
      useBoost,
      stats,
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
