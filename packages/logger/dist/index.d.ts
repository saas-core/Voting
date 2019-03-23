import * as log4js from 'log4js';
export declare class Logger {
    logger: log4js.Logger;
    constructor();
    changeLevel(level: any): void;
    TRACE(message: any): void;
    DEBUG(message: any): void;
    INFO(message: any): void;
    WARN(message: any): void;
    ERROR(message: any): void;
    FATAL(message: any): void;
}
