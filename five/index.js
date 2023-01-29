const handle = async (context, body) => {

  if (body) {
    // Awesome business code:
    body.value++;
  }

  if (context.method === 'POST') {
    return { body };
  }

  return { statusCode: 405, statusMessage: 'Method not allowed' };
}

// Export the function
module.exports = { handle };
