"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const major_1 = require("../service/major");
const index = async (req, res) => {
    try {
        const majors = await (0, major_1.getMajors)();
        res.render("major/index", { majors });
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};
const create = async (req, res) => {
    if (req.method === "GET") {
        res.render("major/create");
    }
    else {
        try {
            await (0, major_1.createMajor)(req.body);
            res.redirect("/major");
        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }
};
const read = async (req, res) => {
    const { id } = req.params;
    try {
        const major = await (0, major_1.getMajor)(id);
        res.render("major/read", { major });
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};
const update = async (req, res) => { };
const remove = async (req, res) => { };
exports.default = { index, create, read, update, remove };
