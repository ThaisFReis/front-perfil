/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import Link from "next/link";
import axios, { AxiosResponse } from "axios";
import { useState, useEffect, useRef, SetStateAction } from "react";
import Menu from "../../Partials/Menu";
import Header from "../../Partials/Header";
import Footer from "../../Partials/Footer";

export default function ProfileEdit() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const [selectedGender, setSelectedGender] = useState("");
  const [otherGenderText, setOtherGenderText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [otherGender, setOtherGender] = useState("");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");

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

  async function editUser() {
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const birthDate = (document.getElementById("birthDate") as HTMLInputElement)
      ?.value;
    const city = (document.getElementById("city") as HTMLInputElement)?.value;
    const gender = (document.getElementById("gender") as HTMLInputElement)
      ?.value;

    if (gender === "Outro") {
    const otherGender = (document.getElementById("otherGender") as HTMLInputElement).value;
    

    if (otherGender.length < 3 || otherGender.length > 50) {
      alert("Gênero precisa ter entre 3 e 50 caracteres");
      return;
    }

    setOtherGender(otherGender);
  }

    if (name.length < 3) {
      alert("O nome precisa ter pelo menos 3 caracteres");
      return;
    }

    if (name.length > 100) {
      alert("Nome muito longo, o limite é de 100 caracteres");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/users/${userId}`,
        {
          name,
          birthDate,
          city,
          gender,
          otherGender,
        }
      );
      alert("Perfil atualizado com sucesso");
    } catch (error) {
      alert("Erro ao atualizar perfil");
    }
  }

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
                  <input
                    type="text"
                    placeholder="Nome"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className={styles.perfil_form_group}>
                  <input
                    type="date"
                    placeholder="Data de nascimento"
                    id="birthDate"
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </div>
                <div className={styles.perfil_form_group}>
                  <select
                    id="gender"
                    name="gender"
                    value={selectedGender}
                    onChange={(e) => {
                      setSelectedGender(e.target.value);
                      if (e.target.value === "Outro") {
                        setOtherGenderText("");
                      }
                    }}
                  >
                    <option value="" hidden>
                      {" "}
                      Gênero{" "}
                    </option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Não Binário">Não binário</option>
                    <option value="Neutro">Neutro</option>
                    <option value="Prefiro não informar">
                      Prefiro não informar
                    </option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
                {selectedGender === "Outro" && (
                  <div className={styles.perfil_form_group} >
                    <input
                      type="text"
                      placeholder="Outro"
                      id="otherGender"
                      value={otherGenderText}
                      onChange={(e) => setOtherGenderText(e.target.value)}
                      required
                      
                    />
                  </div>
                )}

                <div className={styles.perfil_form_group}>
                  <input
                    type="text"
                    placeholder="Cidade"
                    id="city"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <hr className={styles.solid} style={{
                border: isMenuOpen ? "1px solid #868686": "1px solid #d9d9d9"
              }} />
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
                <div className={styles.perfil_form_buttons}
                style={{
                  opacity: isMenuOpen ? 0.5 : 1
                }}>
                  <button style={{ backgroundColor: "#fff", color: "#7775A7" }}>
                    Cancelar
                  </button>
                  <button
                    style={{ backgroundColor: "#7775A7", color: "#fff" }}
                    onClick={(event) => {
                      event.preventDefault();
                      editUser();
                    }}
                  >
                    Confirmar
                  </button>
                </div>
              </form>
            </section>
            <hr className={styles.solid} style={{
                border: isMenuOpen ? "1px solid #868686": "1px solid #d9d9d9"
              }} />
            <h2>Excluir minha conta</h2>
          </section>
        </div>
      </div>
      <Footer isMenuOpen={isMenuOpen} />
    </div>
  );
}
