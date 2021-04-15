import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import SEO from '../components/SEO';

const BeersListGridStyles = styled.ul`
  list-style: none;
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingleBeerStyles = styled.li`
  border: 1px solid var(--grey);
  border-radius: 4px;
  padding: 0 2.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  text-align: center;

  img {
    margin-block-end: 0.8rem;
  }

  span.price {
    padding: 0.8rem;
    background: #f0f0f0;
  }

  p.rating {
    font-size: 1.4rem;
    line-height: 100%;
  }
`;

export default function BeersPage({ data }) {
  const beers = data.allBeer.nodes;

  return (
    <>
      <SEO title={`Beers! We have ${beers.length} beers in stock`} />
      <h2 className="center">{`We have ${beers.length} beers available. Dine in Only!`}</h2>
      <BeersListGridStyles>
        {beers.map((beer) => {
          const beerRating = Math.round(beer.rating.average);

          return (
            <SingleBeerStyles key={beer.id}>
              <img
                src="/assets/images/blue-moon-belgian-wheat-ale.png"
                alt={beer.name}
              />
              {/* FIXME: Get beer images */}
              <h3>{beer.name}</h3>
              <span className="price">{beer.price}</span>
              <p className="rating" title={`${beerRating} out of 5 stars`}>
                {'⭐'.repeat(beerRating)}
                <span style={{ filter: 'grayscale(100%)' }}>
                  {'⭐'.repeat(5 - beerRating)}
                </span>
                <span>({beer.rating.reviews})</span>
              </p>
            </SingleBeerStyles>
          );
        })}
      </BeersListGridStyles>
    </>
  );
}

export const query = graphql`
  query QueryBeers {
    allBeer {
      nodes {
        id
        name
        price
        image
        rating {
          average
          reviews
        }
      }
    }
  }
`;
