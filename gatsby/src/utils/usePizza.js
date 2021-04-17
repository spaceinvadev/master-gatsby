import { useState } from 'react';

export default function usePizza({ pizzas, inputs }) {
  // Create state to hold our Order
  const [order, setOrder] = useState([]);

  // Make fn to add items to Order
  const addToOrder = (item) => setOrder([...order, item]);

  // Create fn to remove items from Order
  const removeFromOrder = (index) =>
    setOrder([...order.slice(0, index), ...order.slice(index + 1)]);

  // TODO: Send Order data to serverless fn upon checkout

  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
