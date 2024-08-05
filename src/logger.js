import chalk from 'chalk';

export default function createLogger() {
   return {
    log: (message) => console.log(chalk.gray(message)),
    warning: (message) => console.log(chalk.red(message)),
    highlight: (message) => console.log(chalk.cyanBright(message)),
    start: (message) => console.log(chalk.yellow(message)),
    data: (message) => console.log(chalk.green(message)),
    debug: console.log
  };
};