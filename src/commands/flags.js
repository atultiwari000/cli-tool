import arg from 'arg';

export function getArgs() {
  return arg({
    '--start': Boolean,
    '--build': Boolean,
    '--ping': Boolean,
    '--count': Number,
    '--timeout': Number,
    '--devices': Boolean,
    '--ds': Boolean,
    '--host': [String],  // Accept multiple hosts
  });
}