import React, { ChangeEvent, FC } from "react";

import { AppContext } from "../providers/AppProvider";
import Item from "../models/Item";
import CraftingProcess from "../providers/CraftingProcessType";
import "./CraftingPage.css";

const CraftingPage: FC = () => {
  const {
    user,
    craftingTableItems,
    addToCraftingTable,
    removeFromcraftingTable,
    craftingProcess,
    updateCraftingProcess,
  } = React.useContext(AppContext);

  const handleProcessSelection = (event: ChangeEvent<HTMLSelectElement>) => {
    updateCraftingProcess(event.target.value);
  };

  return (
    <>
      <h3>
        Crafting - <span style={{ fontSize: 14 }}>Click an item to transfer</span>
      </h3>
      <div className="container">
        <div className="column">
          <h4>My Items</h4>
          {user.items.map((item: Item, idx: number) => (
            <div key={idx}>
              <a href="#" onClick={() => addToCraftingTable(item.name)}>
                {item.name}
              </a>{" "}
              - {item.qty}
            </div>
          ))}
        </div>
        <div className="column">
          <h4>Crafting Table</h4>
          <div className="process-picker">
            <span>Process: </span>
            <select id="crafting-process" value={craftingProcess} onChange={handleProcessSelection}>
              <option value={CraftingProcess.smelt}>{CraftingProcess.smelt}</option>
              <option value={CraftingProcess.pressurize}>{CraftingProcess.pressurize}</option>
              <option value={CraftingProcess.distill}>{CraftingProcess.distill}</option>
              <option value={CraftingProcess.electrolisis}>{CraftingProcess.electrolisis}</option>
            </select>
          </div>
          <button className="run-button">Run</button>
          <div className="crafting-table">
            {craftingTableItems.map((item: Item, idx: number) => (
              <div key={idx}>
                <a href="#" onClick={() => removeFromcraftingTable(item.name)}>
                  {item.name}
                </a>{" "}
                - {item.qty}{" "}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CraftingPage;
