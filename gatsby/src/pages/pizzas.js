import React from 'react';
import { graphql } from 'gatsby';
import PizzasList from '../components/PizzasList';
import ToppingsFilter from '../components/ToppingsFilter';

export default function PizzasPage({ data }) {
  const pizzas = data.allSanityPizza.nodes;

  return (
    <>
      <ToppingsFilter />
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
