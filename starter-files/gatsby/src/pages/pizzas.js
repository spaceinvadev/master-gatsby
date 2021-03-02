import React from 'react';
import { graphql } from 'gatsby';
import PizzasList from '../components/PizzasList';

export default function PizzasPage({ data }) {
  const pizzas = data.allSanityPizza.nodes;

  return (
    <>
      <PizzasList pizzas={pizzas} />
    </>
  );
}

export const query = graphql`
  query QueryAllPizzas {
    allSanityPizza {
      nodes {
        name
        id
        price
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
