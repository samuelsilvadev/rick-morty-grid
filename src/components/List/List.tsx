import { ReactElement } from "react";

type ListProps<Item> = {
  items: Item[];
  renderItem: (item: Item) => ReactElement;
};

const List = <Item extends { id: string | number }>({
  items,
  renderItem,
}: ListProps<Item>) => {
  return (
    <ul>
      {items.map((item) => {
        return <li key={item.id}>{renderItem(item)}</li>;
      })}
    </ul>
  );
};

export default List;
