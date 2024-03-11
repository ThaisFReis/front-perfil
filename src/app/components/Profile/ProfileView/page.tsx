"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.css";
import "glider-js/glider.css";
import axios from "axios";
import Glider from "react-glider";
import Menu from "../../Partials/Menu";
import Header from "../../Partials/Header";
import Footer from "../../Partials/Footer";

export default function ProfileView() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

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

  const fetchUser = async () => {
    try {
      const response = await axios.get("https://perfil-back.onrender.com/users");
      const userData = response.data;
      setUser(userData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const birthDateCalc = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const month = today.getMonth() - birth.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
      return age - 1;
    }
    return age;
  };

  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: isMenuOpen ? "#00000070" : "transparent",
        zIndex: isMenuOpen ? 99999999 : 0,
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
                <b>{user?.name}</b>
                {user?.birthDate ? (
                  <>
                    <b>, </b>
                    {birthDateCalc(user.birthDate)}
                  </>
                ) : (
                  ""
                )}
              </h1>
            </section>
          </section>
          <section className={styles.perfil_container}>
            <section
              className={styles.perfil_img}
              style={{
                filter: isMenuOpen ? "brightness(0.5)" : "brightness(1)",
              }}
            >
              <Glider
                className="glider-container"
                draggable
                hasDots
                slidesToShow={1}
                scrollLock
              >
                {Array.from(
                  { length: Math.min(3, user?.photos?.length || 0) },
                  (_, index) => (
                    <div key={index}>
                      {user && user.photos && index < user.photos.length ? (
                        <Image
                          src={user.photos[index]}
                          alt="user"
                          width={376}
                          height={376}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  )
                )}
              </Glider>
            </section>
            <div className={styles.perfil_info_container}>
              <section className={styles.perfil_info_personal}>
                <div
                  className={styles.perfil_info_personal_item}
                  style={{ marginBottom: 37, marginTop: 18 }}
                >
                  <Image
                    src={"/message.svg"}
                    alt="message"
                    width={15}
                    height={15}
                  />
                  <p>“Gosto de festas e música boa!”</p>
                </div>

                {user && user.gender ? (
                  <div className={styles.perfil_info_personal_item}>
                    <Image src="/user2.svg" alt="user" width={15} height={15} />
                    <p>
                      {" "}
                      {user.gender === "Outro"
                        ? user.otherGender
                        : user.gender}{" "}
                    </p>
                  </div>
                ) : (
                  ""
                )}

                {user && user.city ? (
                  <div
                    className={styles.perfil_info_personal_item}
                    style={{ marginBottom: 18 }}
                  >
                    <Image src="/pin.svg" alt="pin" width={15} height={15} />
                    <p>{user.city}</p>
                  </div>
                ) : (
                  ""
                )}
                {user && (user.gender || user.city) ? (
                  <hr
                    className={styles.solid}
                    style={{
                      border: isMenuOpen
                        ? "1px solid #868686"
                        : "1px solid #d9d9d9",
                    }}
                  />
                ) : (
                  ""
                )}
              </section>
              {user && user.confirmations && user.confirmations.length > 0 ? (
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
                    {user.confirmations.map((event: any, index: number) => (
                      <div
                        key={index}
                        className={styles.perfil_info_events_item}
                      >
                        <Image
                          src={event.photo}
                          alt="event"
                          width={80}
                          height={80}
                          style={{
                            filter: isMenuOpen ? "brightness(0.5)" : "brightness(1)",
                          }}
                        />
                      </div>
                    ))}
                  </section>
                </section>
              ) : (
                ""
              )}
            </div>
          </section>
        </div>
      </div>
      <Footer isMenuOpen={isMenuOpen} />
    </div>
  );
}
