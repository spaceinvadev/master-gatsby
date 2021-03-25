import React from 'react';
import { Link } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import styled from 'styled-components';

const PizzasGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: auto auto 500px;
  gap: 4rem;
`;

const PizzasStyles = styled.div`
  display: grid;
  @supports not (grid-template-rows: subgrid) {
    --rows: auto auto 1fr;
  }
  grid-template-rows: var(--rows, subgrid);
  grid-row: span 3;
  gap: 1rem;
  h2,
  p {
    margin: 0%;
  }
`;

function SinglePizza({ pizza }) {
  return (
    <PizzasStyles>
      <Link to={`/pizzas/${pizza.slug.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
      </Link>
      <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
      <GatsbyImage fluid={pizza.image.asset.fluid} alt={pizza.name} />
    </PizzasStyles>
  );
}

export default function PizzasList({ pizzas }) {
  return (
    <PizzasGridStyles>
      {pizzas.map((pizza) => (
        <SinglePizza pizza={pizza} key={pizza.id} />
      ))}
    </PizzasGridStyles>
  );
}
