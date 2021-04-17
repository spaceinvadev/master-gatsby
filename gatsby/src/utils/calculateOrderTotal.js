import calculatePizzaPrice from './calculatePizzaPrice';

export default function calculateOrderTotal(order, pizzas) {
  return order.reduce((runningTotal, singleItem) => {
    const pizza = pizzas.find(
      (singlePizza) => singlePizza.id === singleItem.id
    );

    return runningTotal + calculatePizzaPrice(pizza.price, singleItem.size);
  }, 0);
}
