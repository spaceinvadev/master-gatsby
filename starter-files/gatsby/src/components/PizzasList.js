import React from 'react';
import { Link } from 'gatsby';
import GatsbyImage from 'gatsby-image';

function SinglePizza({ pizza }) {
  return (
    <Link to={`pizzas/${pizza.slug.current}`}>
      <h2>
        <span className="mark">{pizza.name}</span>
      </h2>
      <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
      <GatsbyImage fluid={pizza.image.asset.fluid} alt={pizza.name} />
    </Link>
  );
}

export default function PizzasList({ pizzas }) {
  return (
    <ul>
      {pizzas.map((pizza) => (
        <SinglePizza pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}
