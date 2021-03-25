import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;

    .count {
      background: white;
      padding: 2px 5px;
    }

    &[aria-current='page'] {
      background: var(--yellow);
    }
  }
`;

function countPizzasInToppings(pizzas) {
  // Return the pizzas with counts
  const counts = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      // Check if this is an existing topping
      const existingTopping = acc[topping.id];

      // If so, increment it by 1
      if (existingTopping) {
        existingTopping.count += 1;
      } else {
        // Otherwise, create new entry in acc and set it to 1
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }

      return acc;
    }, {});

  // Sort them based on their count
  const sortedToppings = Object.values(counts).sort(
    (a, b) => b.count - a.count
  );

  return sortedToppings;
}

export default function ToppingsFilter() {
  // Get a list of all the toppings
  // Get a list of all the pizzas with their toppings
  const { pizzas } = useStaticQuery(graphql`
    query {
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);

  // Count how many pizzas are in each topping
  const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);

  return (
    <ToppingsStyles>
      <Link to="/pizzas">
        <span className="name">All</span>
        <span className="count">{pizzas.nodes.length}</span>
      </Link>
      {/* Loop over the list of toppings and display the topping and the count of pizzas in that topping */}
      {/* FIXME: Fix toppings overlap, maybe from data in Sanity */}
      {toppingsWithCounts.map((toppingWithCount) => (
        <Link
          to={`/toppings/${toppingWithCount.name}`}
          key={toppingWithCount.id}
        >
          <span className="name">{toppingWithCount.name}</span>
          <span className="count">{toppingWithCount.count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
}
