import { ReactElement } from "react";
import styles from "./Layout.module.css";

type LayoutProps = {
  children: ReactElement;
};

const Layout = ({ children }: LayoutProps) => {
  return <main className={styles.wrapper}>{children}</main>;
};

export default Layout;
