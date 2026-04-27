import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

const exporter = new OTLPTraceExporter({
    url: 'http://localhost:4318/v1/traces',
});

export const sdk = new NodeSDK({
    resource: resourceFromAttributes({
        [ATTR_SERVICE_NAME]: 'otel-tracing-service',
    }),
    traceExporter: exporter,
    instrumentations: [getNodeAutoInstrumentations()]
})

export const startTracing = async () => {
    await sdk.start();
    console.log("tracing initialized")
}