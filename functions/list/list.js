const fetch = require('node-fetch');

const handler = async () => {
  try {
    const response = await fetch(
      'https://currency-converter13.p.rapidapi.com/list',
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

    const currencies = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ currencies }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
