import { FC, createContext, useState, ReactNode } from "react";

import User from "../models/User";
import Item from "../models/Item";
import CraftingProcess from "../data/CraftingProcess";
import CraftingRecipes from "../data/CraftingRecipe";
import ItemType from "../data/ItemType";

interface AppContextInterface {
  user: User;
  isLoggedIn: boolean;
  userItemCount: () => number;
  addToUserItems: (item: ItemType) => void;
  // Crafting
  craftingTableItems: Item[];
  moveItemFromUserToCraftingTable: (item: ItemType) => void;
  moveItemFromCraftingTableToUser: (item: ItemType) => void;
  craftingProcess: string;
  updateCraftingProcess: (process: string) => void;
  runCraftingTable: () => void;
  tableOutputMessage: string;
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
  moveItemFromUserToCraftingTable: () => {},
  moveItemFromCraftingTableToUser: () => {},
  craftingProcess: CraftingProcess.Smelt,
  updateCraftingProcess: () => {},
  runCraftingTable: () => {},
  tableOutputMessage: "",
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
  const [craftingProcess, setCraftingProcess] = useState<string>(CraftingProcess.Smelt);
  const [tableOutputMessage, setTableOutputMessage] = useState<string>("");

  const userItemCount = () => {
    // get the sum of all Items' qty's
    if (user.items.length > 0) {
      return user.items.map((item) => item.qty).reduce((prev, next) => prev + next);
    }
    return 0;
  };

  const addToUserItems = (item: ItemType) => {
    const newItems = addItemToList(item, user.items);
    setUser({ ...user, items: newItems });
  };

  const removeFromUserItems = (item: ItemType) => {
    const newItems = removeItemFromList(item, user.items);
    setUser({ ...user, items: newItems });
  };

  const addToCraftingTable = (item: ItemType) => {
    const newItems = addItemToList(item, craftingTableItems);
    setCraftingTableItems(newItems);
  };

  const removeFromCraftingTable = (item: ItemType) => {
    const newItems = removeItemFromList(item, craftingTableItems).slice();
    setCraftingTableItems(newItems);
  };

  const moveItemFromUserToCraftingTable = (item: ItemType) => {
    removeFromUserItems(item);
    addToCraftingTable(item);
  };

  const moveItemFromCraftingTableToUser = (item: ItemType) => {
    removeFromCraftingTable(item);
    addToUserItems(item);
  };

  const updateCraftingProcess = (process: string) => {
    setCraftingProcess(process);
  };

  const runCraftingTable = () => {
    // find recipe whose inputs match table items AND process matches table process
    const tableItemTypes = craftingTableItems.map((item) => item.type);
    // console.log(craftingTableItems);

    const recipe = CraftingRecipes.find(
      (recipe) => itemTypesEqual(recipe.inputItems, tableItemTypes) && recipe.process == craftingProcess
    );

    let craftingItems = craftingTableItems.slice();

    if (recipe) {
      tableItemTypes.forEach((type) => {
        craftingItems = removeItemFromList(type, craftingItems);
      });
      recipe.outputItems.forEach((type) => {
        craftingItems = addItemToList(type, craftingItems);
      });

      setCraftingTableItems(craftingItems);
      return;
    }

    setTableOutputMessage("No results");
  };

  // List helpers

  const addItemToList = (itemName: ItemType, itemList: Item[]): Item[] => {
    const itemListCopy = itemList.slice();
    const existingItem = itemListCopy.find((item) => item.type == itemName);
    if (existingItem) {
      existingItem.qty += 1;
    } else {
      itemListCopy.push({ type: itemName, qty: 1 });
    }
    return itemListCopy;
  };

  const removeItemFromList = (itemName: string, itemList: Item[]): Item[] => {
    var itemListCopy = itemList.slice();

    const existingItem = itemListCopy.slice().find((item) => item.type == itemName);

    if (existingItem) {
      existingItem.qty -= 1;

      if (existingItem.qty == 0) {
        return itemListCopy.filter((item) => item != existingItem);
      }
    }

    return itemListCopy;
  };

  const itemTypesEqual = (arr1: ItemType[], arr2: ItemType[]) => {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
  };

  const value = {
    user,
    isLoggedIn,
    userItemCount,
    addToUserItems,
    craftingTableItems,
    moveItemFromUserToCraftingTable,
    moveItemFromCraftingTableToUser,
    craftingProcess,
    updateCraftingProcess,
    runCraftingTable,
    tableOutputMessage,
  };

  return (
    // the Provider gives access to the context to its children
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
};

export { AppContext, AppProvider };
