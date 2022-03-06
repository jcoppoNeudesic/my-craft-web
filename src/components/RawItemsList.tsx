import React from "react";

type Props = {
  items: string[];
  itemSelected: (name: string) => void;
};

const RawItemsList: React.FC<Props> = ({ items, itemSelected }: Props) => {
  return (
    <div>
      <h4>Raw Items - click to take one</h4>
      {items.map((item, idx) => (
        <div key={idx}>
          <button onClick={() => itemSelected(item)}>{item}</button>
        </div>
      ))}
    </div>
  );
};

export default RawItemsList;
