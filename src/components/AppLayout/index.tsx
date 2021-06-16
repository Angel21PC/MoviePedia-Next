import React, { FC } from "react";

import styles from "./Style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css/animate.min.css";
import "react-notifications-component/dist/theme.css";

export interface AppLayoutProps {}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <div className={styles.style}>
        <main>{children}</main>
      </div>
    </>
  );
};

export default AppLayout;
