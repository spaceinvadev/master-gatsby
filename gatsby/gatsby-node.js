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

export async function createPages(params) {
  // Create pages dinamically
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
  ]);
}
