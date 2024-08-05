import ping from 'ping';
import createLogger from "../logger.js";
const logger = createLogger(); 

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function pingHosts(hosts, iterations = 5, delayMs = 800) {
    for (const host of hosts) {
        logger.highlight(`Pinging ${host}...`);

        let totalRTT = 0;
        let successfulPings = 0;

        for (let i = 0; i < iterations; i++) {
            try {
                const res = await ping.promise.probe(host);

                if (res.alive) {
                    logger.log(`Ping ${i + 1}: ${res.time} ms`);
                    totalRTT += res.time;
                    successfulPings++;
                } else {
                    console.log(`Ping ${i + 1}: Failed`);
                }
            } catch (error) {
                console.log(`Ping ${i + 1}: Error - ${error.message}`);
            }

            await delay(delayMs);
        }

        if (successfulPings > 0) {
            const averageRTT = totalRTT / successfulPings;
            console.log(`\n${host}: Reachable, Average RTT for ${successfulPings} successful pings: ${averageRTT.toFixed(2)} ms`);
        } else {
            console.log(`${host}: Unreachable`);
        }
    }
}
