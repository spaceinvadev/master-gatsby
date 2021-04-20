import formatCurrency from '../../formatCurrency';
import calculatePizzaPrice from './calculatePizzaPrice';

export default function attachNamesAndPrices(order, pizzas) {
  return order.map((item) => {
    const pizza = pizzas.find((singlePizza) => singlePizza.id === item.id);

    return {
      ...item,
      name: pizza.name,
      thumbnail: pizza.image.asset.fluid.src,
      price: formatCurrency(calculatePizzaPrice(pizza.price, item.size)),
    };
  });
}
