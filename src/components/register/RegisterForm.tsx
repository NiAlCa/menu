"use client"

import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import styles from "./registerForm.module.css"

export default function RegisterForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [restaurantName, setRestaurantName] = useState("")
  const [slug, setSlug] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, restaurantName, slug }),
    })
    if (res.ok) {
      router.push("/login")
    } else {
      const data = await res.json()
      setError(data.error || "Error al registrar")
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.registerForm}>
      <div className={styles.formGroup}>
        <label htmlFor="email">Correo electrónico</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="restaurantName">Nombre del restaurante</label>
        <input
          id="restaurantName"
          type="text"
          value={restaurantName}
          onChange={e => setRestaurantName(e.target.value)}
          required
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="slug">Slug</label>
        <input
          id="slug"
          type="text"
          value={slug}
          onChange={e => setSlug(e.target.value)}
          required
          className={styles.input}
        />
      </div>
      {error && <div className={styles.error}>{error}</div>}
      <button type="submit" className={styles.button}>Registrarse</button>
    </form>
  )
}
