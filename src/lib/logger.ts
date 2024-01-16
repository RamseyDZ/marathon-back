import { createLogger, format, transports, addColors } from 'winston';
import * as path from 'path';
import 'winston-daily-rotate-file';

const logDirectory = path.resolve(__dirname, 'logs');
const { combine, timestamp, printf } = format;

const getDayOfMonth = () => { 
    return `${(""+(new Date().getMonth()+1)).padStart(2, '0')}-${new Date().getFullYear().toString()}/${(""+new Date().getDate()).padStart(2,"0")}`
    //return new Date().toLocaleDateString().replace(/\//gm, '-')
}; 
// const customFormat = printf(({ level, message, timestamp }) => {
//     return `[${timestamp}] ${level}: ${message}`;
// });
// console.log(path.join(logDirectory, (new Date().getMonth() +1).toString(),new Date().getDate().toString(), '%DATE%.log')); 
const myFormat = printf(({level, message, timestamp, stack}) => {
    return `- ${level} ** [${timestamp}] : ${stack || message}`; 
})

/**
 * Logger function global 
 * TODO: 
 *    Create the logs inside folders for everyday (eg: 12122022 folder of logs of 12 december 2022)
 * TODO: 
 *    Fix probleme of creating folder every day if we don't restart the process 
 */
const logger = createLogger({
    level: "info", // for more logs you should update this one to debug or higher 
    format:  combine(
        timestamp(), 
        format.errors({stack: true}), 
        myFormat
    ), 
    // transports: [
    //     new transports.DailyRotateFile({
    //         level: "error",
    //         datePattern: 'MM-YYYY/DD/DD',
    //         filename: `logs/%DATE%-error.log`,
    //     }),
    //     new transports.DailyRotateFile({
    //         level: "warn",
    //         datePattern: 'MM-YYYY/DD/DD',
    //         filename: `logs/%DATE%-warnings.log`,
    //     }),
    //     new transports.DailyRotateFile({
    //         level: "info",
    //         datePattern: 'MM-YYYY/DD/DD',
    //         filename: `logs/%DATE%-informations.log`,
    //     }),
    //     new transports.DailyRotateFile({
    //         datePattern: 'MM-YYYY/DD/DD',
    //         filename: `logs/%DATE%-global.log`,
    //     }),
    //     new transports.Console({
    //         format:  format.combine(
    //             format.colorize(), 
    //             timestamp(), 
    //             format.errors({stack: true}), 
    //             myFormat
    //         ), 
    //     }),
    // ], 
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                myFormat
            ),
        }),
        new transports.DailyRotateFile({
            level: "error",
            datePattern: 'MM-YYYY/DD/DD',
            filename: `src/logs/%DATE%-error.log`,
            maxSize: '20m',
            maxFiles: '14d',
        }),
        new transports.DailyRotateFile({
            level: "warn",
            datePattern: 'MM-YYYY/DD/DD',
            filename: `src/logs/%DATE%-warnings.log`,
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        }),
        new transports.DailyRotateFile({
            level: "info",
            datePattern: 'MM-YYYY/DD/DD',
            filename: `src/logs/%DATE%-informations.log`,
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        }),
        new transports.DailyRotateFile({ 
            datePattern: 'MM-YYYY/DD/DD',
            filename: `src/logs/%DATE%-global.log`, 
        }),
        // new transports.DailyRotateFile({
        //     level: "error",
        //     dirname: path.join(logDirectory, (new Date().getMonth() +1).toString(),new Date().getDate().toString()),
        //     datePattern: 'YYYY-MM-DD',
        //     filename:  '%DATE%-errors.log',
        //     zippedArchive: true,
        //     maxSize: '20m',
        //     maxFiles: '14d',
        // }),
    ],
    exceptionHandlers: [
        new transports.File({ 
            filename: `src/logs/${getDayOfMonth()}/exceptions.log` 
            //path.join(logDirectory, (new Date().getMonth() +1).toString(),new Date().getDate().toString(), "exceptions.log")
                    
        })
    ],
    exitOnError: false,
});

export default logger;
