import React from "react";
import { createContext, useState, FC, useEffect } from "react";
import { User } from "../types/account";
import { AccountContextType } from "../types/contexts";

export const AccountContext = createContext<AccountContextType | undefined>(
  undefined
);

interface AccountContextProviderProps {
  children: React.ReactNode;
}

export const AccountContextProvider: FC<AccountContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const accountContextValue: AccountContextType = {
    user,
    setUser,
  };

  useEffect(() => {
    if (user) {
      saveUserToLocalStorage(user);
    }
  }, [user]);

  return (
    <AccountContext.Provider value={accountContextValue}>
      {children}
    </AccountContext.Provider>
  );
};

// Helper functions
function saveUserToLocalStorage(user: User) {
  localStorage.setItem("user", JSON.stringify(user));
}
