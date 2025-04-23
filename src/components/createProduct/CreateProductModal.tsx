"use client";
import { useState } from "react";
import CreateProductForm from "./CreateProductForm";

interface Props {
  menuId: number | string;
}

export default function CreateProductModal({ menuId }: Props) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <button onClick={() => setShowForm(true)}>Crear producto</button>
      {showForm && (
        <div>
          <CreateProductForm menuId={menuId} />
          <button onClick={() => setShowForm(false)}>Cerrar</button>
        </div>
      )}
    </div>
  );
}
