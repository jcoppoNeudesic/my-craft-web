import { FC, createContext, useState, ReactNode } from "react";

import User from "../models/User";
import Item from "../models/Item";
import CraftingProcess from "./CraftingProcessType";

interface AppContextInterface {
  user: User;
  isLoggedIn: boolean;
  userItemCount: () => number;
  addToUserItems: (itemName: string) => void;
  craftingTableItems: Item[];
  addToCraftingTable: (itemName: string) => void;
  removeFromcraftingTable: (itemName: string) => void;
  craftingProcess: string;
  updateCraftingProcess: (process: string) => void;
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
  craftingTableItems: [],
  addToCraftingTable: () => {},
  removeFromcraftingTable: () => {},
  craftingProcess: CraftingProcess.smelt,
  updateCraftingProcess: () => {},
};

// create context
const AppContext = createContext<AppContextInterface>(defaultState);

export type Props = {
  children?: ReactNode;
};

const AppProvider: FC<Props> = ({ children }: Props) => {
  // the value that will be given to the context
  const [user, setUser] = useState<User>(defaultUser);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [craftingTableItems, setCraftingTableItems] = useState<Item[]>([]);
  const [craftingProcess, setCraftingProcess] = useState<string>(CraftingProcess.smelt);

  const userItemCount = () => {
    // get the sum of all Items' qty's
    if (user.items.length > 0) {
      return user.items.map((item) => item.qty).reduce((prev, next) => prev + next);
    }
    return 0;
  };

  const addToUserItems = (itemName: string) => {
    const newItemList = addItemToList(itemName, user.items);
    setUser({ ...user, items: newItemList });
  };

  const addToCraftingTable = (itemName: string) => {
    // remove from user items
    const newUserItems = removeItemFromList(itemName, user.items);
    setUser({ ...user, items: newUserItems });
    // add to crafting table
    const newItemList = addItemToList(itemName, craftingTableItems);
    setCraftingTableItems(newItemList);
  };

  const removeFromcraftingTable = (itemName: string) => {
    // remove from crafting table
    const newCraftingItems = removeItemFromList(itemName, craftingTableItems);
    setCraftingTableItems(newCraftingItems);
    // add to user items
    const newUserItems = addItemToList(itemName, user.items);
    setUser({ ...user, items: newUserItems });
  };

  const updateCraftingProcess = (process: string) => {
    setCraftingProcess(process);
  };

  const value = {
    user,
    isLoggedIn,
    userItemCount,
    addToUserItems,
    craftingTableItems,
    addToCraftingTable,
    removeFromcraftingTable,
    craftingProcess,
    updateCraftingProcess,
  };

  return (
    // the Provider gives access to the context to its children
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
};

// data logic

const addItemToList = (itemName: string, itemList: Item[]): Item[] => {
  const existingItem = itemList.slice().find((item) => item.name == itemName);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    itemList.push({ name: itemName, qty: 1 });
  }
  return itemList;
};

const removeItemFromList = (itemName: string, itemList: Item[]): Item[] => {
  const existingItem = itemList.slice().find((item) => item.name == itemName);
  if (existingItem) {
    existingItem.qty -= 1;
    if (existingItem.qty == 0) {
      itemList = itemList.slice().filter((item) => item != existingItem);
    }
  }
  return itemList;
};

export { AppContext, AppProvider };
