import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";

export default function Profile({ isMenuOpen }: { isMenuOpen: boolean }) {
  return (
    <section
      className={styles.perfil}
      style={{
        opacity: isMenuOpen ? "0.8" : "1",
      }}
    >
      <section className={styles.perfil_header}>
        <Image src="/arrow-left.svg" alt="voltar" width={15} height={15} />
        <h1>Perfil</h1>
      </section>
      <section className={styles.perfil_img}>
        <Image src="/user2.jpg" alt="foto" width={100} height={100} />
        <Image src="/Component img.svg" alt="add" width={100} height={100} />
        <Image src="/Component img.svg" alt="add" width={100} height={100} />
      </section>
      <section className={styles.perfil_info}>
        <section className={styles.perfil_info_header}>
          <h1>
            <b>Jennie,</b> 28
          </h1>
          <button>
            <Link rel="stylesheet" href="/components/Profile/ProfileEdit">
              Editar perfil
            </Link>
          </button>
        </section>
        <section className={styles.perfil_info_personal}>
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
        </section>
        <hr className={styles.solid} />
        <div
          className={styles.perfil_info_personal_item}
          style={{ margin: "12px" }}
        >
          <Image src={"/message.svg"} alt="message" width={15} height={15} />
          <p>“Gosto de festas e música boa!”</p>
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
      <h2>
        <Link rel="stylesheet" href="/components/Profile/ProfileView">
          Ver meu perfil publico{" "}
        </Link>
      </h2>
    </section>
  );
}
