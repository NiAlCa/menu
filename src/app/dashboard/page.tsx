import CreateProductModal from "../../components/createProduct/CreateProductModal";

export default function DashboardPage() {
  const menuId = 1; // Cambia por el real

  return (
    <div>
      <h1>Bienvenido al Dashboard</h1>
      <CreateProductModal menuId={menuId} />
    </div>
  );
}
