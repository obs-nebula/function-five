const handle = async (context, body) => {

  if (body) {
    // Awesome business code:
    body.value++;
    if (!process.env.DEV) {
      // Sends the result to the next function:
      callNext(body.value);
    }
  }

  if (context.method === 'POST') {
    return { body };
  }

  return { statusCode: 405, statusMessage: 'Method not allowed' };
}

async function callNext(value) {
  try {
    console.log(`Sending ${value} to Function Three`);
    const res = await fetch('http://localhost:8082', {
      method: 'POST',
      body: JSON.stringify({ value: value }),
      headers: { 'Content-Type': 'application/json' }
    });
    const json = await res.json();
    console.log(`Got ${JSON.stringify(json)} from Function Three`);
  } catch (e) {
    console.log(e);
  }
}

// Export the function
module.exports = { handle };
