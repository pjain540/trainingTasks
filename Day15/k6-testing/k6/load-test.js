//imported http routes from the backend application
import http from 'k6/http';
//imported check and sleep functions
import { check, sleep } from 'k6';
//imported rate and trend classes from mertrics
import { Rate, Trend } from 'k6/metrics';

//error rate metric to track errors
export let errorRate = new Rate('errors');
//latency metric to track response time
export let latency = new Trend('latency');

//options 
export let options = {
    stages: [
        { duration: '5m', target: 200 }, // ramp up
    ],
    thresholds: {
        errors: ['rate<0.005'], // < 0.5%
        latency: ['p(95)<300'], // p95 < 300ms
    },
};

//base url of the backend application
const BASE_URL = 'http://localhost:3000';

//default function to be executed by k6
export default function () {
    let uuid = '123e4567';

    // 1. verify endpoint
    let res1 = http.get(`${BASE_URL}/verify/${uuid}`);
    errorRate.add(res1.status !== 200);
    latency.add(res1.timings.duration);

    check(res1, {
        'verify status 200': (r) => r.status === 200,
    });

    // 2. transfer ownership
    let payload = JSON.stringify({
        userId: 'user1',
        newOwnerId: 'user2',
    });

    let res2 = http.post(`${BASE_URL}/transfer-ownership`, payload, {
        headers: { 'Content-Type': 'application/json' },
    });

    errorRate.add(res2.status !== 200);
    latency.add(res2.timings.duration);

    // 3. dashboard polling
    let res3 = http.get(`${BASE_URL}/dashboard`);
    errorRate.add(res3.status !== 200);
    latency.add(res3.timings.duration);

    sleep(1);
}