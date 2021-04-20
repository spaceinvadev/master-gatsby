const nodemailer = require('nodemailer');

const generateOrderEmail = ({ order, total }) => `
  <div>
    <h2>Your Recent Order for $${total}</h2>
    <p>Please start walking over, we will have your order ready in th next 20 minutes.</p>
    <ul>
      ${order
        .map(
          (item) => `
          <li>
            <img src=${item.thumbnail} alt=${item.name} />
            <span>${item.size} | ${item.name} - ${item.price}</span>
          </li>
        `
        )
        .join('')}
    </ul>
    <p>Your total is $${total} due at pickup.</p>
    <style>
      ul {
        list-style: none;
      }
    </style>
  </div>
`;

// Create a transporter for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

exports.handler = async (event, context) => {
  await wait(5000);
  const body = JSON.parse(event.body);

  // Validate incoming data is correct
  const requiredFields = ['email', 'name', 'order'];

  for (const requiredField of requiredFields) {
    if (!body[requiredField]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the ${requiredField} field.`,
        }),
      };
    }
  }

  // Check there are items in the cart
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'You have to add at least one item to the cart.',
      }),
    };
  }

  // // Send email
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>`,
    subject: 'New order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });

  // Send success/error message

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
