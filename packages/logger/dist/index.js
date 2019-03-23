"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("log4js");
class Logger {
    constructor() {
        this.logger = log4js.getLogger();
        this.logger.level = 'debug';
    }
    changeLevel(level) {
        this.logger.level = level;
    }
    TRACE(message) {
        return this.logger.trace(message);
    }
    DEBUG(message) {
        return this.logger.debug(message);
    }
    INFO(message) {
        return this.logger.info(message);
    }
    WARN(message) {
        return this.logger.warn(message);
    }
    ERROR(message) {
        return this.logger.error(message);
    }
    FATAL(message) {
        return this.logger.fatal(message);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=index.js.map