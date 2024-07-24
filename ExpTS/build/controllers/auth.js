"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const major_1 = require("../service/major");
const signup = async (req, res) => {
    if (req.method === "GET") {
        const majors = await (0, major_1.getMajors)();
        res.render("auth/signup", { majors });
    }
    else {
        res.send("Dados Recebidos");
    }
};
const login = async (req, res) => { };
const logout = async (req, res) => { };
exports.default = { signup, login, logout };
