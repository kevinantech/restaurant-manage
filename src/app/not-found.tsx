"use client";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-2xl text-gray-600">
        Oops! La página que estás buscando no fue encontrada.
      </p>
      <p className="mt-2 text-gray-500">
        Es posible que la dirección esté mal escrita o la página ya no exista.
      </p>
    </div>
  );
}
