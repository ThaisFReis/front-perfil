"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import Link from "next/link";

import { useState, useEffect, useRef } from "react";
import Menu from "../../Partials/Menu";

import Header from "../../Partials/Header";
import Footer from "../../Partials/Footer";

export default function ProfileEdit() {
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
              <h1>Editar perfil</h1>
            </section>
            <section className={styles.perfil_form}>
              <form action="">
                <div className={styles.perfil_form_group}>
                  <input type="text" placeholder="Nome" id="name" />
                </div>
                <div className={styles.perfil_form_group}>
                  <input
                    type="date"
                    placeholder="Data de nascimento"
                    id="date"
                  />
                </div>
                <div className={styles.perfil_form_group}>
                  <input type="option" placeholder="gênero" id="gender" />
                </div>
                <div className={styles.perfil_form_group}>
                  <input type="option" placeholder="Cidade" id="city" />
                </div>
                <hr className={styles.solid} style={{ margin: "18px 0" }} />
                <div className={styles.perfil_form_group}>
                  <input
                    type="text"
                    placeholder="descrição"
                    id="description"
                    style={{
                      height: "102px",
                      paddingTop: "12px",
                      verticalAlign: "top",
                    }}
                  />
                </div>
                <div className={styles.perfil_form_buttons}>
                  <button style={{ backgroundColor: "#fff", color: "#7775A7" }}>
                    Cancelar
                  </button>
                  <button style={{ backgroundColor: "#7775A7", color: "#fff" }}>
                    Confirmar
                  </button>
                </div>
              </form>
            </section>
            <hr className={styles.solid} style={{ margin: "48px 0 24px 0" }} />
            <h2>Excluir minha conta</h2>
          </section>
        </div>
      </div>
      <Footer isMenuOpen={isMenuOpen} />
    </div>
  );
}
