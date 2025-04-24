"use client"

import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./navBar.module.css";
import { useRouter } from "next/navigation";

const NavBar: React.FC = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verifica si hay sesión consultando el endpoint protegido
    const checkSession = async () => {
      const res = await fetch("/api/session", {
        credentials: "include", // <-- agrega esto
      });
      setIsLoggedIn(res.ok);
    };
    checkSession();

    // Escucha cambios en el almacenamiento local
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "sessionChanged") {
        checkSession();
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login"; // Redirige a la página de inicio después de cerrar sesión
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.link}>Inicio</Link>
      <Link href="/dashboard" className={styles.link}>Dashboard</Link>
      {isLoggedIn ? (
        <button
          className={styles.link}
          onClick={handleLogout}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          Log Out
        </button>
      ) : (
        <Link href="/login" className={styles.link}>Log In</Link>
      )}
    </nav>
  );
};

export default NavBar;
