import { FC, createContext, useState, ReactNode } from "react";

import User from "../models/User";
import Item from "../models/Item";

interface AppContextInterface {
  user: User;
  isLoggedIn: boolean;
  userItemCount: () => number;
  addToUserItems: (itemName: string) => void;
}

const defaultUser: User = {
  username: "Guest",
  items: [],
};

const defaultState: AppContextInterface = {
  user: defaultUser,
  isLoggedIn: false,
  userItemCount: () => 0,
  addToUserItems: () => {},
};

const AppContext = createContext<AppContextInterface>(defaultState);

export type Props = {
  children?: ReactNode;
};

// create context
const AppProvider: FC<Props> = ({ children }: Props) => {
  // the value that will be given to the context
  const [user, setUser] = useState<User>(defaultUser);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const userItemCount = () => {
    if (user.items.length > 0) {
      return user.items.map((item) => item.qty).reduce((prev, next) => prev + next);
    }
    return 0;
  };

  const addToUserItems = (itemName: string) => {
    const newItemList = addToItemList(itemName, user.items);
    setUser({ ...user, items: newItemList });
  };

  const value = { user, isLoggedIn, userItemCount, addToUserItems };

  return (
    // the Provider gives access to the context to its children
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
};

const addToItemList = (itemName: string, itemList: Item[]): Item[] => {
  const existingItem = itemList.find((item) => item.name == itemName);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    itemList.push({ name: itemName, qty: 1 });
  }
  return itemList;
};

export { AppContext, AppProvider };
