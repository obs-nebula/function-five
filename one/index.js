const opentelemetry = require('@opentelemetry/api');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { BasicTracerProvider, SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
// const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');

const resource = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: process.env.npm_package_name
});

const provider = new BasicTracerProvider({ resource: resource });

const exporter = new OTLPTraceExporter({
  url: 'http://otelcol:4318/v1/traces'
});

provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
provider.register();

// diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const handle = async (context, body) => {
  const span = opentelemetry.trace.getTracer('default').startSpan('handle');

  if (body) {
    // Awesome business code:
    body.value++;
    if (!process.env.DEV) {
      // Sends the result to the next function:
      callNext(body.value);
    }
  }

  if (context.method === 'POST') {
    span.end();
    return { body };
  }

  span.end();
  return { statusCode: 405, statusMessage: 'Method not allowed' };
};

async function callNext(value) {
  try {
    console.log(`Sending ${value} to Function Two`);
    const res = await fetch('http://two:8081', {
      method: 'POST',
      body: JSON.stringify({ value: value }),
      headers: { 'Content-Type': 'application/json' }
    });
    const json = await res.json();
    console.log(`Got ${JSON.stringify(json)} from Function Two`);
  } catch (e) {
    console.log(e);
  }
}

// Export the function
module.exports = { handle };
