import React from 'react';
import { graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatCurrency from '../../formatCurrency';

export default function OrderPage({ data }) {
  const { values, updateValue } = useForm({
    name: '',
    email: '',
  });
  const pizzas = data.pizzas.nodes;

  return (
    <>
      <SEO title="Order a Pizza" />
      <form>
        <fieldset>
          <legend>Your Info</legend>
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={updateValue}
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={updateValue}
            />
          </label>
        </fieldset>
        <fieldset>
          <legend>Menu</legend>
          <ul>
            {pizzas.map((pizza) => (
              <li key={pizza.id}>
                <GatsbyImage
                  fluid={pizza.image.asset.fluid}
                  width="48"
                  height="48"
                  alt={pizza.name}
                />
                <div>
                  <h2>{pizza.name}</h2>
                </div>
                <div>
                  {['S', 'M', 'L'].map((size) => (
                    <button type="button">
                      {size}
                      {' | '}
                      {formatCurrency(calculatePizzaPrice(pizza.price, size))}
                    </button>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </fieldset>
        <fieldset>
          <legend>Order</legend>
        </fieldset>
      </form>
    </>
  );
}

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
