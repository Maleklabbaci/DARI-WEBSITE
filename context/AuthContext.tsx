
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserType, Alert } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: any) => Promise<void>;
  logout: () => void;
  updateBalance: (amount: number) => void;
  updateSubscription: (type: 'free' | 'premium' | 'ultime') => void;
  updateProfile: (data: Partial<User>) => void;
  toggleFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
  addAlert: (alert: Omit<Alert, 'id' | 'isActive'>) => void;
  toggleAlert: (alertId: string) => void;
  removeAlert: (alertId: string) => void;
  incrementPhoneUnlocks: () => boolean; 
  useBoost: () => boolean;
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
            subscription: 'free',
            favorites: [],
            alerts: [
              { id: 'a1', type: 'apartment', transaction: 'buy', wilaya: 'Alger', isActive: true }
            ]
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
          subscription: 'free',
          favorites: [],
          alerts: []
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

  const toggleFavorite = (propertyId: string) => {
    if (user) {
      const favorites = user.favorites || [];
      const isFav = favorites.includes(propertyId);
      const newFavorites = isFav 
        ? favorites.filter(id => id !== propertyId)
        : [...favorites, propertyId];
      
      const updatedUser = { ...user, favorites: newFavorites };
      setUser(updatedUser);
      localStorage.setItem('dari_user', JSON.stringify(updatedUser));
    }
  };

  const isFavorite = (propertyId: string) => {
    return user?.favorites?.includes(propertyId) || false;
  };

  const addAlert = (alertData: Omit<Alert, 'id' | 'isActive'>) => {
    if (user) {
      const newAlert: Alert = {
        ...alertData,
        id: Math.random().toString(36).substr(2, 9),
        isActive: true
      };
      const updatedUser = { ...user, alerts: [...(user.alerts || []), newAlert] };
      setUser(updatedUser);
      localStorage.setItem('dari_user', JSON.stringify(updatedUser));
    }
  };

  const toggleAlert = (alertId: string) => {
    if (user) {
      const updatedAlerts = (user.alerts || []).map(a => 
        a.id === alertId ? { ...a, isActive: !a.isActive } : a
      );
      const updatedUser = { ...user, alerts: updatedAlerts };
      setUser(updatedUser);
      localStorage.setItem('dari_user', JSON.stringify(updatedUser));
    }
  };

  const removeAlert = (alertId: string) => {
    if (user) {
      const updatedAlerts = (user.alerts || []).filter(a => a.id !== alertId);
      const updatedUser = { ...user, alerts: updatedAlerts };
      setUser(updatedUser);
      localStorage.setItem('dari_user', JSON.stringify(updatedUser));
    }
  };

  const incrementPhoneUnlocks = () => {
    if (user?.subscription !== 'free') return true; 
    if (stats.phoneUnlocksToday < 3) {
      setStats(s => ({ ...s, phoneUnlocksToday: s.phoneUnlocksToday + 1 }));
      return true;
    }
    return false;
  };

  const useBoost = () => {
    if (stats.boostsRemaining > 0) {
      setStats(s => ({ ...s, boostsRemaining: s.boostsRemaining - 1 }));
      return true;
    }
    return false;
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
      toggleFavorite,
      isFavorite,
      addAlert,
      toggleAlert,
      removeAlert,
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
