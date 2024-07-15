import { NextFunction, Response, Request } from "express";
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const logDir = process.env.LOG_DIR || './logs';
const logFormat = process.env.LOG_FORMAT || 'simple';

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

function logger(type: "simple" | "complete") {
    return (req: Request, res: Response, next: NextFunction) => {
        const logFilePath = path.join(logDir, 'access.log');
        const now = new Date().toISOString();
        const logEntrySimple = `${now} ${req.method} ${req.url}\n`;
        const logEntryComplete = `${now} ${req.method} ${req.url} HTTP/${req.httpVersion} ${req.get('User-Agent')}\n`;
        
        const logEntry = type === 'complete' ? logEntryComplete : logEntrySimple;

        fs.appendFile(logFilePath, logEntry, (err) => {
            if (err) {
                console.error('Failed to write log entry:', err);
            }
        });

        console.log(logEntry.trim()); // Optional: Log to console as well
        next();
    };
}

export default logger;
