import { describe, it, expect } from '@jest/globals';
import { InMemorySpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import request from 'supertest';
import app from '../src/app';

describe('Tracing टेस्ट', () => {
    it('should capture verifyUnit span', async () => {
        const exporter = new InMemorySpanExporter();
        const provider = new NodeTracerProvider({
            spanProcessors: [new SimpleSpanProcessor(exporter)]
        });

        provider.register();

        await request(app).get('/api/test');

        const spans = exporter.getFinishedSpans();

        const verifySpan = spans.find(s => s.name === 'verifyUnit');

        expect(verifySpan).toBeDefined();
        if (verifySpan) {
            expect(verifySpan.attributes.unitId).toBe('unit-123');
        }
    });
});