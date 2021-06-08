import styles from "./Footer.module.scss";
const Footer = () => {
  return (
    <footer className="sticky-botton">
      <div className={styles.footer}>
        <h3>Power by</h3>
        <img
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg"
          alt=""
        />
      </div>
    </footer>
  );
};

export default Footer;
