import React, {ReactNode} from "react";
import {Link} from 'umi';
import {Input, Menu} from 'antd';
import Icon, {
  HomeOutlined,
  ShoppingCartOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  HeartOutlined,
  SettingOutlined
} from '@ant-design/icons';

import BeerIcon from "@/components/icons/beerIcon";
import Logo from "@/components/assets/Logo";
import styles from "./style.less";


const {Search} = Input;

export function getLink(to: string, label: string): ReactNode {
  return (
    <Link to={to} className={styles.activeNavbar}>{label}</Link>
  )
}

const routes = [
  {key: "home", label: getLink("/", "Home"), icon: <HomeOutlined className={styles.navIcon}/>},
  {
    key: "products", label: getLink("/product/detailed", "Detailed Category"),
    icon: <Icon component={BeerIcon}/>,
  }
];

export default function () {

  return (
    <div className={styles.header}>
      <Logo className={styles.logo}/>
      <div className={styles.rightHeaderContainer}>
        <div className={styles.searchBox}>
          <Search placeholder="search beers" size="large" enterButton/>
        </div>
        <div className={styles.userAndCartContainer}>
          <div className={styles.headerIconContainer}>
            <HeartOutlined className={styles.headerIcon}/>
            Wishlist
          </div>
          <div className={styles.headerIconContainer}>
            <ShoppingCartOutlined className={styles.headerIcon}/>
            cart
          </div>
          <div className={styles.headerIconContainer}>
            <SettingOutlined className={styles.headerIcon}/>
            settings
          </div>
          <div className={styles.headerIconContainer}>
            <UserOutlined className={styles.headerIcon}/>
            Sign in/sign up
          </div>
        </div>
      </div>
      <div className={styles.menuContainer}>
        <Menu items={routes} mode={"horizontal"} className={styles.menu} theme={"dark"}/>
      </div>
    </div>
  );
}
