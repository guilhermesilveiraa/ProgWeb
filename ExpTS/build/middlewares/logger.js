"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function logger(type) {
    if (type === "combined")
        return (req, res, next) => {
            console.log(`${new Date().toDateString()} ${req.method} ${req.url}`);
            next();
        };
    else {
        return (req, res, next) => {
            console.log(`${new Date().toDateString()} ${req.url}`);
            next();
        };
    }
}
exports.default = logger;
