import styles from "./styles.module.css";
import Image from "next/image";

const Footer = ({ isMenuOpen }: { isMenuOpen: boolean }) => {
  return (
    <footer
      className={styles.footer}
      style={{
        opacity: isMenuOpen ? "0.8" : "1",
      }}
    >
      <Image
        src="/logo-branco.svg"
        alt="Beplauze Logo"
        className={styles.vercelLogo}
        width={100}
        height={26}
      />
      <p className={styles.footerText}>
        Donec pulvinar accumsan tellus ac tristique. Nulla est enim, hendrerit
        vitae cursus non, volutpat eu erat
      </p>
      <section className={styles.footerIcons}>
        <a href="https://twitter.com/beplauze">
          <Image
            src="/twitter.svg"
            alt="Twitter"
            className={styles.icon}
            width={15}
            height={15}
          />
        </a>
        <a href="https://www.tiktok.com/@beplauze?_t=8e5uOCFhatX&_r=1">
          <Image
            src="/facebook.svg"
            alt="Facebook"
            className={styles.icon}
            width={15}
            height={15}
          />
        </a>
        <a href="https://www.instagram.com/beplauze.rj/">
          <Image
            src="/instagram.svg"
            alt="Instagram"
            className={styles.icon}
            width={15}
            height={15}
          />
        </a>
      </section>
      <a
        href="https://www.beplauze.com/rj/politica-privacidade"
        className={styles.footerLink}
      >
        {" "}
        Politica de privacidade{" "}
      </a>
      <a
        href="https://www.beplauze.com/rj/termos-condicoes"
        className={styles.footerLink}
      >
        {" "}
        Termos e condições{" "}
      </a>
      <p className={styles.footerCopy}>© Copyright 2023 Beplauze</p>
    </footer>
  );
};

export default Footer;
