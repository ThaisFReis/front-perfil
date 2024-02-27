"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.css";
import "glider-js/glider.css";
import Glider from "react-glider";
import Menu from "../../Partials/Menu";
import Header from "../../Partials/Header";
import Footer from "../../Partials/Footer";

export default function ProfileView() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <section className={styles.perfil}>
            <section className={styles.perfil_header}>
              <Link href="/">
                <Image
                  src="/arrow-left.svg"
                  alt="voltar"
                  width={15}
                  height={15}
                />
              </Link>
            </section>
            <section className={styles.perfil_info}>
              <h1>
                <b>Jennie,</b> 28
              </h1>
            </section>
          </section>
          <section className={styles.perfil_img}>
            <Glider
              className="glider-container"
              draggable
              hasDots
              slidesToShow={1}
              scrollLock
            >
              <div>
                <Image src="/user2.jpg" alt="user" width={150} height={150} />
              </div>
              <div>
                <Image src="/user2.jpg" alt="user" width={150} height={150} />
              </div>
              <div>
                <Image src="/user2.jpg" alt="user" width={150} height={150} />
              </div>
            </Glider>
          </section>
          <section className={styles.perfil_info_personal}>
            <div
              className={styles.perfil_info_personal_item}
              style={{ marginBottom: 37 }}
            >
              <Image
                src={"/message.svg"}
                alt="message"
                width={15}
                height={15}
              />
              <p>“Gosto de festas e música boa!”</p>
            </div>
            <div className={styles.perfil_info_personal_item}>
              <Image src="/user2.svg" alt="user" width={15} height={15} />
              <p>Mulher</p>
            </div>
            <div
              className={styles.perfil_info_personal_item}
              style={{ marginBottom: 18 }}
            >
              <Image src="/pin.svg" alt="pin" width={15} height={15} />
              <p>Rio de Janeiro</p>
            </div>
            <hr className={styles.solid} />
            <section
              className={styles.perfil_info_events}
              style={{ marginTop: 18 }}
            >
              <div className={styles.perfil_info_personal_item}>
                <Image
                  src={"/calendar-tick.svg"}
                  alt="calendar"
                  width={15}
                  height={15}
                />
                <p>Eventos confirmados</p>
              </div>
              <section className={styles.perfil_info_events_list}>
                <Image src={"/event.png"} alt="event" width={70} height={75} />
                <Image src={"/event.png"} alt="event" width={70} height={75} />
                <Image src={"/event.png"} alt="event" width={70} height={75} />
              </section>
            </section>
          </section>
        </div>
      </div>
      <Footer isMenuOpen={isMenuOpen} />
    </div>
  );
}
