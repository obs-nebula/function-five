let functionGlobalValue = 0;

const handle = async (context, body) => {

  if (body) {
    // Awesome business code:
    body.value++;
    functionGlobalValue = body.value;
  }

  if (context.method === 'POST') {
    return { body };
  } else if (context.method === 'GET') {
    return { 
      value: functionGlobalValue,
      query: context.query
    };
  }

  return { statusCode: 405, statusMessage: 'Method not allowed' };
}

// Export the function
module.exports = { handle };
