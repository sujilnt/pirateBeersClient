import React from 'react';

import Navbar from "@/components/Navbar";
import styles from "./style.less";

function Layout(props:any) {
  return(
      <div className={styles.container}>
         <div className={styles.headerContainer}>
           <Navbar/>
         </div>
        <div>{props.children}</div>
      </div>
  );
}

export default Layout
