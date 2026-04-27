import { trace } from '@opentelemetry/api';

const tracer = trace.getTracer('custom-tracer');

export const verifyUnit = async (unitId: string) => {
    return tracer.startActiveSpan('verifyUnit', async (span) => {
        try {
            // fake business logic
            const ownershipChain = ['A', 'B', 'C'];

            span.setAttribute('unitId', unitId);
            span.setAttribute('ownershipChainLength', ownershipChain.length);

            return true;
        } catch (err: any) {
            span.recordException(err);
            throw err;
        } finally {
            span.end();
        }
    });
};