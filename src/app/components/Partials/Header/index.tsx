"use client";
import Image from "next/image";
import styles from "./styles.module.css";

const Header = ({
  toggleMenu,
  isMenuOpen,
}: {
  toggleMenu: () => void;
  isMenuOpen: boolean;
}) => {
  return (
    <header
      className={styles.header}
      style={{
        opacity: isMenuOpen ? "0.8" : "1",
      }}
    >
      <section className={styles.headerContainer}>
        <Image
          src="/menu.svg"
          alt="Menu"
          className={styles.menu}
          width={15}
          height={15}
          onClick={toggleMenu}
          style={{ cursor: isMenuOpen ? "initial" : "pointer" }}
        />

        <Image
          src="/logo-cores.svg"
          alt="Logo"
          className={styles.logo}
          width={105}
          height={26}
        />
      </section>
      <section className={styles.headerContainer}>
        <Image
          src="/pin.svg"
          alt="Location"
          className={styles.location}
          width={15}
          height={15}
        />
        <p className={styles.locationText}>Rio de Janeiro </p>
        <Image
          src="/down.svg"
          alt="Change Location"
          className={styles.down}
          width={15}
          height={15}
        />
      </section>
    </header>
  );
};

export default Header;
