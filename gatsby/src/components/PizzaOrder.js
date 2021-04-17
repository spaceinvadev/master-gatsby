import React from 'react';
import GatsbyImage from 'gatsby-image';
import MenuItemStyles from '../styles/MenuItemStyles';
import formatCurrency from '../../formatCurrency';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';

export default function PizzaOrder({ order, pizzas, removeFromOrder }) {
  return (
    <ul>
      {order.map((singleOrder, index) => {
        const pizza = pizzas.find(
          (singlePizza) => singlePizza.id === singleOrder.id
        );

        return (
          <MenuItemStyles key={`${singleOrder.id}-${index}`}>
            <GatsbyImage fluid={pizza.image.asset.fluid} />
            <h2>{pizza.name}</h2>
            <p>
              {formatCurrency(
                calculatePizzaPrice(pizza.price, singleOrder.size)
              )}
              <button
                type="button"
                className="remove"
                title={`Remove ${singleOrder.size} ${pizza.name} from Order.`}
                onClick={() => removeFromOrder(index)}
              >
                &times;
              </button>
            </p>
          </MenuItemStyles>
        );
      })}
      <p>
        You have {order.length} item{order.length === 1 ? '' : 's'} in your
        order.
      </p>
    </ul>
  );
}
