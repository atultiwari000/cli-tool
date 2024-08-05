#!/usr/bin/env node --experimental-fetch --require=./suppress-experimental.js index.js

import { program } from 'commander';
import figlet from 'figlet';
import chalk from 'chalk'; // chalk version 4.1.2  is to be used, any future versions may cause some problems
import pingHosts from '../src/commands/ping.js';
import getDefaultGateway from '../src/commands/gateway.js';
import getMacAddresses from '../src/commands/mac-address.js';
import createLogger from "../src/logger.js";
const logger = createLogger(); 
import { getArgs } from '../src/commands/flags.js';

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {

    const ora = await import("ora");

    program.version("1.0.0").description("Network Logger");
    try {
        const args = getArgs();
    
        //console.log.logdebug('Received args', args);
    
        if (args['--start']) {
            // const config = getConfig();
            // start(config);
            const spinner = ora.default("Starting the app...").start();
            await delay(1000);
            spinner.stop();
            logger.highlight(figlet.textSync("Network\nLogger", { horizontalLayout: "full" }));
        } else if (args['--ping']) {
            if (args['--host']) {
                const hosts = args['--host'];
                pingHosts(hosts, 5);
    
            } else {
                // If no hosts provided, get the default gateway
               getDefaultGateway((error, gateway) => {
                    if (error) {
                        logger.log(`Error retrieving default gateway: ${error.message}`);
                    } else {
                        logger.log(`Pinging default gateway: ${gateway}`);
                        pingHosts([gateway], args['--count'] || 5);
                    }
               });
            }
          
        } else if (args['--devices']) {
            try {
                const spinner = ora.default('Retrieving devices...').start();
                const result = await getMacAddresses();
                const { devices, count } = result;
                spinner.stop();
                logger.highlight(`Connected devices (Total: ${count}):`);
                devices.forEach(device => {
                const macAddress = device.mac ? device.mac : 'N/A';
                const latency = device.latency ? device.latency : 'N/A';
                logger.data(`\nHost: ${device.ip}\nMAC Address: ${macAddress}\nLatency: ${latency}`);
                });
            } catch (error) {
                logger.warning(`Error retrieving devices: ${error.message}`);
            }
        } else {
            throw new Error("Invalid command. Use --ping with --host to ping hosts.");
        }
        
    }catch (e) {
        console.log(e.message);
        console.log();
        usage();
    }
    
    function usage() {
        console.log(`${chalk.whiteBright('tool [CMD]')}
          ${chalk.greenBright('--start')} \tStarts the app
          ${chalk.greenBright('--build')} \tBuilds the app
          ${chalk.greenBright('--ping --host [host1] [host2] ...')} \tPings specified hosts
          ${chalk.greenBright('--count [num]')} \tNumber of pings to send
          ${chalk.greenBright('--timeout [sec]')} \tTimeout for each ping in seconds
          ${chalk.greenBright('--devices')} \tDevices connected to the network`);
    }
}

main();


