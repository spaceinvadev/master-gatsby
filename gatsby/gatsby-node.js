import path from 'path';
import fetch from 'isomorphic-fetch';

async function turnPizzasIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');

  // 2. Query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  // 3. Loop over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    const slug = pizza.slug.current;

    actions.createPage({
      path: `pizzas/${slug}`, // URL
      component: pizzaTemplate,
      // Use context to pass data to template component
      context: {
        slug,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  // Get the template
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');

  // Query all toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
    }
  `);

  // Create pages for each topping
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `toppings/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
}

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // 1. Fetch a list of beers
  const endpointUrl = 'https://api.sampleapis.com/beers/ale';
  const response = await fetch(endpointUrl);
  const beers = await response.json();

  // 2. Loop over it
  beers.forEach((beer) => {
    const nodeMeta = {
      id: createNodeId(`beer-${beer.id}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  });
  // 3. Create a node for each beer
}

// Sourcing data from external APIs
export async function sourceNodes(params) {
  // Fecth a list of beers and source them into our gatsby API
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

export async function createPages(params) {
  // Create pages dinamically
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
  ]);
}
