import React, { useState } from "react";

import RawItemsList from "./components/RawItemsList";
import "./App.css";

const freeItems = ["Copper Ore", "Crude Oil", "Coal", "Brine", "Sand", "Wood"];

interface Item {
  name: string;
  qty: number;
}

const App: React.FC = () => {
  const [myItems, setMyIems] = useState<Item[]>([]);

  const addtoMyItems = (itemName: string) => {
    const myItemsCopy = myItems.slice();
    const existingItem = myItemsCopy.slice().find((item) => item.name == itemName);

    if (existingItem) {
      existingItem.qty += 1;
      setMyIems(myItemsCopy);
      return;
    }

    const newItem: Item = {
      name: itemName,
      qty: 1,
    };

    setMyIems([...myItems, newItem]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>MyCraft</h2>
      </header>
      <div>
        <b>My Items:</b>{" "}
        {myItems.map((item, idx) => (
          <div key={idx}>
            {item.name} - {item.qty}
          </div>
        ))}
      </div>
      <RawItemsList items={freeItems} itemSelected={addtoMyItems} />
    </div>
  );
};

export default App;
