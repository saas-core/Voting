import * as log4js from 'log4js'

export class Logger {
  logger: log4js.Logger
  constructor() {
    this.logger = log4js.getLogger()

    this.logger.level = 'debug'
  }

  public changeLevel(level) {
    this.logger.level = level
  }

  public TRACE(message) {
    return this.logger.trace(message)
  }

  public DEBUG(message) {
    return this.logger.debug(message)
  }

  public INFO(message) {
    return this.logger.info(message)
  }

  public WARN(message) {
    return this.logger.warn(message)
  }

  public ERROR(message) {
    return this.logger.error(message)
  }

  public FATAL(message) {
    return this.logger.fatal(message)
  }
}
