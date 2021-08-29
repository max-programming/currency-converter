const fetch = require('node-fetch');

const handler = async event => {
  if (event.httpMethod !== 'POST')
    return { statusCode: 400, body: 'Only POST requests allowed' };

  const { from, to, amount } = JSON.parse(event.body);
  try {
    const response = await fetch(
      `https://currency-converter13.p.rapidapi.com/convert?from=${from}&to=${to}&amount=${amount}`,
      {
        headers: {
          'x-rapidapi-key': process.env.RAPID_API_KEY,
          'x-rapidapi-host': process.env.RAPID_API_HOST,
        },
      }
    );
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }
    const converted = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ converted }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
