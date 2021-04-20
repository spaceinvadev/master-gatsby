import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';
import formatCurrency from '../../formatCurrency';
import calculateOrderTotal from './calculateOrderTotal';
import attachNamesAndPrices from './attachNamesAndPrices';

export default function usePizza({ pizzas, values }) {
  // Create state to hold our Order
  // We movd useSate up to the provider
  // const [order, setOrder] = useState([]);
  // Now, we access both our state/updater fn (setOrder) via Context
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Make fn to add items to Order
  const addToOrder = (item) => setOrder([...order, item]);

  // Create fn to remove items from Order
  const removeFromOrder = (index) =>
    setOrder([...order.slice(0, index), ...order.slice(index + 1)]);

  async function submitOrder(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    // Collect data to send
    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatCurrency(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
    };

    // Send Order data to serverless fn upon checkout
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    const text = JSON.parse(await res.text());

    // check if everything worked
    if (res.status >= 400 && res.status < 600) {
      setLoading(false); // turn off loading
      setError(text.message);
    } else {
      // it worked!
      setLoading(false);
      setMessage('Success! Come on down for your pizza');
    }
  }

  return {
    error,
    loading,
    message,
    order,
    addToOrder,
    removeFromOrder,
    submitOrder,
  };
}
