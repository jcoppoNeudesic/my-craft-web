import React, { FC } from "react";

import rawItems from "../data/rawItems.json";
import { AppContext } from "../providers/AppProvider";

const rawItemList = rawItems.allItems;

const RawItemsList: FC = () => {
  const { addToUserItems } = React.useContext(AppContext);

  return (
    <div>
      <h4>Raw Items - click to take one</h4>
      {rawItemList.map((itemName, idx) => (
        <div key={idx}>
          <button onClick={() => addToUserItems(itemName)}>{itemName}</button>
        </div>
      ))}
    </div>
  );
};

export default RawItemsList;
