import { createContext, useContext } from 'react';

export const MenuContext = createContext();

export function useMenu() {
  return useContext(MenuContext);
}