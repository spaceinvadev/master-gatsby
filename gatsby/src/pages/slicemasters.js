import React from 'react';
import { graphql, Link } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import styled from 'styled-components';

const SlicemastersGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const SlicemasterStyles = styled.div`
  a {
    text-decoration: none;
  }

  .gatsby-image-wrapper {
    height: 400px;
  }

  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }

  .description {
    background: var(--yellow);
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    z-index: 2;
    position: relative;
    transform: rotate(1deg);
    text-align: center;
  }
`;

export default function SliceMastersPage({ data }) {
  const slicemasters = data.allSanityName.nodes;

  return (
    <>
      <SlicemastersGrid>
        {slicemasters.map((slicemaster) => (
          <SlicemasterStyles>
            <Link to={`/slicemasters/${slicemaster.slug.current}`}>
              <h2>
                <span className="mark">{slicemaster.name}</span>
              </h2>
            </Link>
            <GatsbyImage fluid={slicemaster.image.asset.fluid} />
            <p className="description">{slicemaster.description}</p>
          </SlicemasterStyles>
        ))}
      </SlicemastersGrid>
    </>
  );
}

export const query = graphql`
  query QuerySliceMasters {
    allSanityName {
      totalCount
      nodes {
        id
        name
        slug {
          current
        }
        description
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
