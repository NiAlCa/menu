import { useState, ChangeEvent, FormEvent } from "react";

interface CreateProductFormProps {
  menuId: number | string;
}

interface FormState {
  name: string;
  description: string;
  price: string;
  category: string;
  images: string;
}

export default function CreateProductForm({ menuId }: CreateProductFormProps) {
  const [form, setForm] = useState<FormState>({
    name: "",
    description: "",
    price: "",
    category: "",
    images: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch("/api/menu_items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, menu_id: menuId }),
    });
    // Opcional: limpiar formulario o mostrar mensaje
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Nombre" onChange={handleChange} required />
      <textarea name="description" placeholder="Descripción" onChange={handleChange} />
      <input name="price" type="number" placeholder="Precio" onChange={handleChange} required />
      <input name="category" placeholder="Categoría" onChange={handleChange} />
      <input name="images" placeholder="URL de imagen" onChange={handleChange} />
      <button type="submit">Crear producto</button>
    </form>
  );
}
