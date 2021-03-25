import path from 'path';

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

export async function createPages(params) {
  // Create pages dinamically
  // 1. Pizzas
  await turnPizzasIntoPages(params);

  // 2. Toppings
  // 3. Slicemasters
}
