import React from 'react';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import styles from "./style.less";

function Layout(props:any) {
  return(
      <div className={styles.container}>
         <div className={styles.headerContainer}>
           <Navbar/>
         </div>
        <div className={styles.content}>{props.children}</div>
          <Footer/>
      </div>
  );
}

export default Layout
