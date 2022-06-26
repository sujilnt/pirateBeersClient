import styles from './index.less';
import HomePageBanners from "@/components/HomePageBanners";

export default function Index() {
  return (
    <div className={styles.container}>
      <HomePageBanners/>
      <div>
        <h1>Beer Categories</h1>
      </div>


    </div>

  );
}
