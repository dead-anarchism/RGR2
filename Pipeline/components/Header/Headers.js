import { useRouter } from "next/navigation";
import styles from "../../src/styles/Header/Header.module.css";
export const Headers = (props) => {
  const router = useRouter();

  const handleNavigation = () => {
    if(localStorage.getItem('isAuth') === 'true')
    router.push("/dashBoard/");
  };

  const handelExit = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isAuth');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('name')
    }

    router.push('/Login/')
  }

  return (
  <header className={styles.header}>
    <div className={styles.header__column}>
      <a style={{cursor:"pointer",fontSize:"18px"}} onClick={handleNavigation}>GitVerce</a>
    </div>
      <div className={styles.header__column}>
      {props.exit ? <button className={styles.sign__btn} onClick={handelExit}>exit</button> : ''}
      </div>
  </header>
  );
};
