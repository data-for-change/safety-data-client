/**
 * singlton logger class
 */
class Logger {
  log(message) {
    console.log(message);
  }

  error(message) {
    console.error(message);
  }
}
const logger = new Logger();
Object.freeze(logger);
export default logger;
