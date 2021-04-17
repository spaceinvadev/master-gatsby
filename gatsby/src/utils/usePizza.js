import { useContext } from 'react';
import OrderContext from '../components/OrderContext';

export default function usePizza() {
  // Create state to hold our Order
  // We movd useSate up to the provider
  // const [order, setOrder] = useState([]);
  // Now, we access both our state/updater fn (setOrder) via Context
  const [order, setOrder] = useContext(OrderContext);

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
