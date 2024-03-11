"use client";
import { useState, useEffect, useRef } from "react";
import Menu from "./components/Partials/Menu";
import Header from "./components/Partials/Header";
import Profile from "./components/Profile/page";
import Footer from "./components/Partials/Footer";
import styles from "./page.module.css";
import { useUser } from "./userContext";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fechar o menu ao clicar fora dele
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        (menuRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  const containerClassName = isMenuOpen
    ? `${styles.container} ${styles.menuOpen}`
    : styles.container;

  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: isMenuOpen ? "#00000070" : "transparent",
      }}
    >
      <Menu isMenuOpen={isMenuOpen} />
      <div className={containerClassName} ref={menuRef}>
        <div className={styles.main}>
          <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
          <Profile/>
        </div>
      </div>
      <Footer isMenuOpen={isMenuOpen} />
    </div>
  );
}
