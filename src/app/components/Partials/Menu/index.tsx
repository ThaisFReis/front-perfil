import Image from "next/image";
import styles from "./styles.module.css";
import React from "react";

const Menu = ({ isMenuOpen }: { isMenuOpen: boolean }) => {
  return isMenuOpen ? (
    <main className={styles.main_menu}>
      <section className={styles.menu}>
        <Image src="/user2.jpg" alt="jennie" width={60} height={60} />
        <section className={styles.menu_info}>
          <h1>Olá</h1>
          <h1>Jennie Kim</h1>
          <p>jennie@gmail.com</p>
        </section>
        <button>
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="15" height="15" fill="white" />
            <path d="M1.5 1.5L13.5 13.5M1.5 13.5L13.5 1.5" stroke="#7775A7" />
          </svg>
        </button>
      </section>
      <hr className={styles.solid} />
      <section className={styles.actions}>
        <button>
          <Image src="/id.svg" alt="dados" width={20} height={20} />
          Meus dados
        </button>
        <button>
          <Image src="/user.svg" alt="perfil" width={20} height={20} />
          Meu perfil
        </button>
        <button>
          <Image src="/heart.svg" alt="favorite" width={20} height={20} />
          Favoritos
        </button>
        <button>
          <Image
            src="/text-document.svg"
            alt="signature"
            width={20}
            height={20}
          />
          Assinatura
        </button>
        <button>
          <Image src="/cog.svg" alt="settings" width={15} height={15} />
          Configurações
        </button>
      </section>
      <hr className={styles.solid} />
      <section className={styles.signout}>
        <button>
          <Image src="/signin.svg" alt="signout" width={20} height={20} />
          Sair
        </button>
      </section>
      <footer className={styles.footer}>
        <h2>Informações legais</h2>
        <p>Termos de uso</p>
        <p>Política de privacidade</p>
      </footer>
    </main>
  ) : null;
};

export default Menu;
