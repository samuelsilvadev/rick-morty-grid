import { ReactElement } from "react";
import styles from "./List.module.css";

type ListProps<Item> = {
  items: Item[];
  renderItem: (item: Item) => ReactElement;
  className?: string;
};

const List = <Item extends { id: string | number }>({
  className = "",
  items,
  renderItem,
}: ListProps<Item>) => {
  return (
    <ul className={`${styles.list} ${className}`}>
      {items.map((item) => {
        return <li key={item.id}>{renderItem(item)}</li>;
      })}
    </ul>
  );
};

export default List;
