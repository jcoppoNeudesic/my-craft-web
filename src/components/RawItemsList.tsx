import React, { FC } from "react";
import { AppContext } from "../providers/AppProvider";
import { rawItems } from "../data/ItemType";

const RawItemsList: FC = () => {
  const { addToUserItems } = React.useContext(AppContext);

  return (
    <div>
      <h4>Raw Items - click to take one</h4>
      {rawItems.map((itemName, idx) => (
        <div key={idx}>
          <button onClick={() => addToUserItems(itemName)}>{itemName}</button>
        </div>
      ))}
    </div>
  );
};

export default RawItemsList;
