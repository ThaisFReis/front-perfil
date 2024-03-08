"use client";
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";
import axios from "axios";
import {
  ChangeEvent,
  JSXElementConstructor,
  Key,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { useUser } from "../../userContext";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export default function Profile({ isMenuOpen }: { isMenuOpen: boolean }) {
  const [user, setUser] = useState<any>(null);
  const { userId, setUserId } = useUser();
  const [images, setImages] = useState(["", "", ""]);
  const [confirmations, setConfirmations] = useState([]);

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      const userData = response.data;

      console.log(userData);

      setUser(userData);
      setUserId(userData.id);
      setConfirmations(userData.confirmations);

      const userId = userData.id;
      window.localStorage.setItem("userId", String(userId));
      console.log("User ID:", userId);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    }
  };

  useEffect(
    () => {
      fetchUser();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

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

  // Verifica se o usuário tem imagens de perfil
  const hasImages = user && user.photos && user.photos.length > 0;

  useEffect(() => {
    if (hasImages) {
      setImages(user.photos);
    }
  }, [hasImages, user]);

  // Função para fazer upload de imagens
  const handleImageUpload = async (file: File, index: number) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `http://localhost:3000/users/${user.id}/photos`,
        formData
      );
      const newImages = [...images];
      newImages[index] = response.data.url;
      setImages(newImages);

      // Atualiza o usuário
      const updatedUser = {
        ...user,
        photos: newImages,
      };
      setUser(updatedUser);

      // Busca os dados atualizados do usuário
      fetchUser();
    } catch (error) {
      console.error("Erro ao fazer upload de imagem:", error);
    }
  };

  // Função para lidar com a alteração do arquivo de entrada
  const handleFileInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      handleImageUpload(event.target.files[0], index);
    }
  };

  // Função para remover uma imagem
  const handleRemoveImage = async (index: number) => {
    const confirmRemoval = window.confirm(
      "Tem certeza que deseja remover esta imagem?"
    );
    if (confirmRemoval) {
      try {
        await axios.delete(
          `http://localhost:3000/users/${user.id}/photos/${index}`
        );

        // Atualiza o estado das imagens
        const newImages = [...images];
        newImages[index] = "";
        setImages(newImages);

        // Reordenar as imagens para garantir que só haja espaços vagos à direita
        const reorderedImages = newImages.filter((image) => image !== "");
        setImages(reorderedImages);

        // Atualiza as fotos renderizadas
        const updatedUser = {
          ...user,
          photos: reorderedImages,
        };

        setUser(updatedUser);

        // Busca os dados atualizados do usuário
        fetchUser();
      } catch (error) {
        console.error("Erro ao excluir imagem:", error);
      }
    }
  };

  // Função para remover uma confirmação
  const handleRemoveConfirmation = async (index: number) => {
    const confirmRemoval = window.confirm(
      "Tem certeza que deseja remover esta confirmação?"
    );
    if (confirmRemoval) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/users/${user.id}/confirmations/${index}`
        );

        // Atualiza o estado das confirmações
        const newConfirmations = confirmations.filter(
          (confirmation: { id: number }) => confirmation.id !== index
        );

        setConfirmations(newConfirmations);

        // Atualiza as confirmações renderizadas
        const updatedUser = {
          ...user,
          confirmations: newConfirmations,
        };

        setUser(updatedUser);

        // Busca os dados atualizados do usuário
        fetchUser();
      } catch (error) {
        console.error("Erro ao excluir confirmação:", error);
      }
    }
  };

  return (
    <>
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
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index}>
              {user && user.photos && index < user.photos.length ? (
                <div
                  className={styles.perfil_img_item}
                  style={{
                    position: "relative",
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    backgroundImage: `url(${user.photos[index]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: isMenuOpen ? "brightness(0.5)" : "brightness(1)",
                  }}
                >
                  <Image
                    src="/delete.svg"
                    alt="delete"
                    width={15}
                    height={15}
                    onClick={() => handleRemoveImage(index)}
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 17,
                      filter: isMenuOpen ? "brightness(0.9)" : "brightness(1)",
                    }}
                  />
                </div>
              ) : (
                <label>
                  <input
                    id={`input-${index}`}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    style={{ display: "none" }}
                    onChange={(event) => handleFileInputChange(event, index)}
                  />
                  <img
                    src="/Component img.svg"
                    alt="Add"
                    width={100}
                    height={100}
                    style={{
                      cursor: "pointer",
                      filter: isMenuOpen ? "brightness(0.5)" : "brightness(1)",
                    }}
                  />
                </label>
              )}
            </div>
          ))}
        </section>
        {user && (
          <>
            <section className={styles.perfil_info}>
              <section className={styles.perfil_info_header}>
                <h1>
                  <b>{user.name}</b>
                  {user.birthDate ? (
                    <>
                      <b>, </b>
                      {birthDateCalc(user.birthDate)}
                    </>
                  ) : (
                    ""
                  )}
                </h1>
                <button
                style={{
                  filter: isMenuOpen ? "brightness(0.5)" : "brightness(1)",
                }}>
                  <Link href="components/Profile/ProfileEdit">
                    Editar perfil
                  </Link>
                </button>
              </section>

              <section className={styles.perfil_info_personal}>
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
              </section>
            </section>
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
            <div
              className={styles.perfil_info_personal_item}
              style={{ margin: "12px" }}
            >
              <Image
                src={"/message.svg"}
                alt="message"
                width={15}
                height={15}
              />
              <p>“Gosto de festas e música boa!”</p>
            </div>
            {user && user.confirmations && user.confirmations.length > 0 ? (
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
                  {user.confirmations.map(
                    (confirmation: {
                      id: Key | null | undefined;
                      photo: string | StaticImport;
                      name:
                        | string
                        | number
                        | boolean
                        | ReactElement<any, string | JSXElementConstructor<any>>
                        | Iterable<ReactNode>
                        | ReactPortal
                        | PromiseLikeOfReactNode
                        | null
                        | undefined;
                    }) => (
                      <div
                        key={confirmation.id}
                        className={styles.perfil_info_events_item}
                        style={{
                          position: "relative",
                          width: 100,
                          height: 100,
                          borderRadius: 50,
                          backgroundImage: `url(${confirmation.photo})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          filter: isMenuOpen
                            ? "brightness(0.5)"
                            : "brightness(1)",
                        }}
                      >
                        <Image
                          src={"/delete.svg"}
                          alt="delete"
                          width={15}
                          height={15}
                          onClick={() =>
                            handleRemoveConfirmation(confirmation.id as number)
                          }
                          style={{
                            position: "absolute",
                            bottom: 0,
                            right: 17,
                            filter: isMenuOpen
                              ? "brightness(0.8)"
                              : "brightness(1)",
                          }}
                        />
                      </div>
                    )
                  )}
                </section>
              </section>
            ) : (
              ""
            )}
          </>
        )}
        <h2>
          <Link href="/components/Profile/ProfileView">
            Ver meu perfil publico
          </Link>
        </h2>
      </section>
    </>
  );
}
