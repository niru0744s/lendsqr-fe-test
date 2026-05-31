import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCachedUsers, updateCachedUserStatus, UserProfile } from '../utils/mockData';

interface UserContextType {
  users: UserProfile[];
  stats: {
    total: number;
    active: number;
    withLoans: number;
    withSavings: number;
  };
  isLoading: boolean;
  activateUser: (id: string) => void;
  blacklistUser: (id: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setUsers(getCachedUsers());
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'Active').length,
    withLoans: users.filter(u => parseFloat(u.accountBalance.replace(/[₦,]/g, '')) > 400000).length, // simulated condition
    withSavings: users.filter(u => u.status === 'Active' || u.status === 'Pending').length // simulated condition
  };

  const activateUser = (id: string) => {
    const updated = updateCachedUserStatus(id, 'Active');
    setUsers(updated);
  };

  const blacklistUser = (id: string) => {
    const updated = updateCachedUserStatus(id, 'Blacklisted');
    setUsers(updated);
  };

  return (
    <UserContext.Provider value={{ users, stats, isLoading, activateUser, blacklistUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};
