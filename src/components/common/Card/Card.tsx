// src/components/commons/Card/Card.tsx

import React, { useState } from "react";

import Button from "../Button/Button";
import Counter from "../Counter/Counter";
import { Product } from "../../../types/interfaces";

interface CardProps {
  product: Product;
  showCounter?: boolean; // Propiedad opcional para mostrar el contador
  showButton?: boolean; // Propiedad opcional para mostrar el botón
  showStock?: boolean; // Propiedad opcional para mostrar el stock
  buttonText?: string; // Texto personalizado para el botón
  onClick?: () => void; // Función opcional para el clic en el botón
  onAddToCart?: (product: Product, quantity: number) => void; // Función opcional para agregar al carrito
  onViewDetail?: () => void; // Función opcional para ver el detalle del producto
}

const Card: React.FC<CardProps> = ({
  product,
  showCounter = false,
  showButton = true,
  showStock = false,
  buttonText = "View More",
  onClick = () => {},
  onAddToCart = () => {},
  onViewDetail = () => {},
}) => {
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className="border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
      <img
        src={product.fotoPortada}
        alt={product.nombre}
        className="w-full h-48 object-cover rounded-t-lg cursor-pointer"
        onClick={onViewDetail}
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-blue-700 cursor-pointer" onClick={onViewDetail}>
          {product.nombre}
        </h2>
        <p className="text-gray-700 text-sm mt-2">{product.descripcion}</p>

        {/* Mostrar precio */}
        <p className="text-gray-900 text-lg font-semibold mt-2">${product.precio}</p>

        {/* Mostrar stock si es necesario */}
        {showStock && (
          <p className="text-gray-700 text-sm mt-2">Stock: {product.cantidad}</p>
        )}

        {/* Mostrar el contador si showCounter es verdadero */}
        {showCounter && (
          <div className="flex justify-between items-center mt-4">
            <Counter initialCount={1} min={1} max={product.cantidad} onChange={setQuantity} />
          </div>
        )}

        {/* Botón de acción principal */}
        {showButton && (
          <div className="flex justify-between items-center mt-4">
            <Button text={buttonText} onClick={onClick} variant="primary" />
          </div>
        )}

        {/* Botón para agregar al carrito si showCounter es verdadero */}
        {showCounter && (
          <div className="flex justify-between items-center mt-4">
            <Button text="Add to Cart" onClick={() => onAddToCart(product, quantity)} variant="secondary" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;