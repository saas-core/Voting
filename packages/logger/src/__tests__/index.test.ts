import { Logger } from '../'

function run() {
  const logger = new Logger()

  logger.INFO('Whats up')

  logger.TRACE('Yooo up')

  logger.ERROR({ message: 'foo' })

  logger.WARN({ message: 'WARN' })

  logger.FATAL({ message: 'FATAL' })

  logger.DEBUG('TEST')
}

run()
