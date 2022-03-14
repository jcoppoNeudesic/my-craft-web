import React, { ChangeEvent, FC } from "react";

import { AppContext } from "../providers/AppProvider";
import Item from "../models/Item";
import CraftingProcess from "../data/CraftingProcess";
import "./CraftingPage.css";

const CraftingPage: FC = () => {
  const {
    user,
    craftingTableItems,
    moveItemFromUserToCraftingTable,
    moveItemFromCraftingTableToUser,
    craftingProcess,
    updateCraftingProcess,
    runCraftingTable,
    tableOutputMessage,
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
              <a href="#" onClick={() => moveItemFromUserToCraftingTable(item.type)}>
                {item.type}
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
              <option value={CraftingProcess.Smelt}>{CraftingProcess.Smelt}</option>
              <option value={CraftingProcess.Pressurize}>{CraftingProcess.Pressurize}</option>
              <option value={CraftingProcess.Distill}>{CraftingProcess.Distill}</option>
              <option value={CraftingProcess.Electrolisis}>{CraftingProcess.Electrolisis}</option>
            </select>
          </div>
          <button className="run-button" onClick={() => runCraftingTable()}>
            Run
          </button>
          <span>{tableOutputMessage}</span>
          <div className="crafting-table">
            {craftingTableItems.map((item: Item, idx: number) => (
              <div key={idx}>
                <a href="#" onClick={() => moveItemFromCraftingTableToUser(item.type)}>
                  {item.type}
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
