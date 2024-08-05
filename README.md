Network Logger CLI Tool
Overview
The Network Logger CLI Tool is a command-line application designed for network analysis and troubleshooting. It offers functionalities such as pinging hosts, retrieving the default gateway, and listing connected devices on the network.

Features
Start the App: Launch the application with a banner.
Ping Hosts: Ping specified hosts and calculate the average round-trip time (RTT).
Retrieve Default Gateway: Automatically retrieve and ping the default gateway if no hosts are specified.
List Connected Devices: Scan the network for connected devices and display their IP and MAC addresses.
Custom Commands: Interactive shell for executing network commands.
Prerequisites
Node.js version 14 or above.
nmap installed on your system for network scanning.
Chalk version 4.1.2 installed for consistent color output in logs.(IMPORTANT: Chalk version 5 and above maynot give the same result)

Installation
Clone the Repository:

bash
Copy code
git clone https://github.com/yourusername/network-logger-cli.git
cd network-logger-cli
Install Dependencies:

bash
Copy code
npm install
Make the CLI Tool Executable:

Add the tool to your PATH by creating a symbolic link or by modifying your shell configuration.

bash
Copy code
chmod +x index.js
Ensure nmap is Installed:

For macOS/Linux, install using your package manager, e.g., brew install nmap.
For Windows, download and install from nmap's official site.
Usage
Run the tool using the command line:

bash
Copy code
node index.js [OPTIONS]
Options
--start: Launch the application and display the startup banner.

bash
Copy code
node index.js --start
--ping: Ping specified hosts with the option to set the number of pings.

bash
Copy code
node index.js --ping --host <host1> <host2> --count <num>
--devices: List devices connected to the network with their IP, MAC addresses, and latency.

bash
Copy code
node index.js --devices
--timeout: Set a timeout for each ping in seconds.

bash
Copy code
node index.js --ping --host <host> --timeout <sec>
Interactive Shell
Start an interactive shell session to run commands dynamically:

bash
Copy code
node shell.js
Commands available within the shell include:

exit or quit: Exit the shell session.
Any of the CLI options listed above.
Logging
The tool provides logging capabilities with different log levels using Chalk for color-coded output:

log: General information in gray.
warning: Warnings in red.
highlight: Important messages in cyan.
data: Data output in green.
Code Structure
index.js: Main entry point for the CLI tool.
shell.js: Interactive shell interface.
commands/: Directory containing command-specific logic.
ping.js: Handles the pinging of hosts.
gateway.js: Retrieves the default gateway.
mac-address.js: Scans and lists network devices.
flags.js: Parses command-line arguments.
logger.js: Logger utility for standardized logging.
config.js: Loads and parses the configuration file.
schema.json: Configuration schema file (ensure to adjust the path if necessary).
Contributing
Contributions are welcome! Please follow the standard fork-and-pull request workflow:

Fork the repository.
Clone your forked repo: git clone https://github.com/yourusername/network-logger-cli.git.
Create a new branch: git checkout -b feature-branch.
Make changes and commit: git commit -am 'Add new feature'.
Push to the branch: git push origin feature-branch.
Create a Pull Request.
