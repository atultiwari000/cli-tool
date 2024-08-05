import { exec } from 'child_process';
import getDefaultGateway from './gateway.js';
import { getArgs } from '../commands/flags.js';

async function getGateway() {
    return new Promise((resolve, reject) => {
        getDefaultGateway((error, gateway) => { // Assuming IPv4
            if (error) {
                reject(new Error(`Error retrieving default gateway: ${error.message}`));
            } else {
                const CIDR = "0/24";
                const splitGateway = gateway.split(".", 3);
                const newGateway = splitGateway.join(".").concat('.', CIDR);
                resolve(newGateway);
            }
        });
    });
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function getMacAddresses() {
    try {
        const gateway = await getGateway(); // Retrieve the default gateway
        return new Promise((resolve, reject) => {
            const args = getArgs();
            let command;
            if (args['--ds']) {
                command = `nmap ${gateway}`
            } else {
                command = `nmap -sn ${gateway}`
            }
            exec(command, async (error, stdout, stderr) => { // ping scan but it soenot give detailed result
                if (error) {
                    reject(new Error(`Error executing nmap: ${stderr}`));
                    return;
                }
                
                await delay(1000);
                
                const result = parseNmapOutput(stdout);
                resolve(result);
            });
        });
    } catch (error) {
        throw new Error(`Error getting default gateway: ${error.message}`);
    }
}
function parseNmapOutput(output) {
    const lines = output.split('\n');
    const devices = [];
    let currentDevice = null;
    
    const countMatch = output.match(/Nmap done: \d+ IP addresses \((\d+) hosts up\)/);
    const count = countMatch ? parseInt(countMatch[1], 10) : 0;
    
    lines.forEach(line => {
        const ipMatch = line.match(/Nmap scan report for (\S+)/);
        const macMatch = line.match(/MAC Address: (\S+)/);
        const latencyMatch = line.match(/Host is up \(([\d.]+s) latency\)/);

        if (ipMatch) {
            if (currentDevice) {
                devices.push(currentDevice);
            }
            currentDevice = { ip: ipMatch[1], mac: 'N/A', latency: 'N/A' }; //
        } 
        if (macMatch && currentDevice) {
            currentDevice.mac = macMatch[1];
        }
        if (latencyMatch && currentDevice) {
            currentDevice.latency = latencyMatch[1];
        }
    });
    
    if (currentDevice) {
        devices.push(currentDevice);
    }
    
    return { devices, count };
}
