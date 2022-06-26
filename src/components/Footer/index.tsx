import React from "react";
import styles from "./style.less";
import Icon from "@ant-design/icons";
import SkullIcon from "@/components/assets/SkullIcon";
import Logo from "@/components/assets/Logo";
import {Input,Button} from "antd";
import {Link} from "umi";

export default function(){
  return(
    <div className={styles.footerContainer}>
      <footer className={styles.mainFooter}>
        <div className={styles.column}>
          <Logo className={styles.footerLogo} />
        </div>
        <div className={styles.column}>
          <h2 className={styles.columnHeading}>DISCOVER MORE</h2>
          <Link to={"/products"} className={styles.footerMenu}>ALL Beers</Link>
          <Link to={"/products/newCollection"} className={styles.footerMenu}>New Beer Collections</Link>

          <Link to={"/products/beers"} className={styles.activeNavbar}>Beers</Link>
          ....
        </div>
        <div className={styles.column}>
          <h2 className={styles.columnHeading}>INFORMATION</h2>
          <Link to={"/terms"} className={styles.footerMenu}>TERMS AND CONDITIONS</Link>
          <Link to={"/privacy"} className={styles.footerMenu}>PRIVACY POLICY</Link>
          ...
        </div>
        <div className={styles.column}>
          <Icon component={SkullIcon} />
          <div className={styles.emailForm}>
            <Input placeholder="Basic usage"  size="large"/>
            <Button
              type="primary"
              className={styles.emailSubmitButton}
              size="large"
            >
              submit
            </Button>
          </div>
        </div>
      </footer>
      <footer className={styles.subFooter}>
        pirates beer
      </footer>
    </div>
  )
}
