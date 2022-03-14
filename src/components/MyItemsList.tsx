import React, { FC } from "react";

import { AppContext } from "../providers/AppProvider";
import Item from "../models/Item";

export type Props = {
  items: Item[];
};

const RawItemsList: FC = () => {
  const { user } = React.useContext(AppContext);

  return (
    <>
      <h4>My Items</h4>
      {user.items?.map((item: Item, idx: number) => (
        <div key={idx}>
          {item.type} - {item.qty}
        </div>
      ))}
    </>
  );
};

export default RawItemsList;
