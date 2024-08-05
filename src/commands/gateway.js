import { exec } from 'child_process';
import { platform as _platform } from 'os';

function getDefaultGateway(callback) {
    const platform = _platform();

    let command;
    if (platform === 'win32') {
        command = 'ipconfig';
    } else if (platform === 'linux' || platform === 'darwin') {
        command = 'ip route'; // 'netstat -rn' can also be used
    } else {
        return callback(new Error('Unsupported OS'));
    }

    exec(command, (error, stdout, stderr) => {
        if (error) {
            return callback(error);
        }

        if (platform === 'win32') {
            // For Windows
            const match = stdout.match(/Default Gateway[^\d]*([\d.]+)/);
            if (match) {
                return callback(null, match[1]);
            }
        } else {
            // For Linux/macOS
            const match = stdout.match(/default via ([\d.]+)/);
            if (match) {
                return callback(null, match[1]);
            }
        }

        return callback(new Error('Default gateway not found'));
    });
}

export default getDefaultGateway;