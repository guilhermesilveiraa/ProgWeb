"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMajor = exports.getMajors = exports.createMajor = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createMajor = async (major) => {
    return prisma.major.create({ data: major });
};
exports.createMajor = createMajor;
const getMajors = async () => {
    return prisma.major.findMany();
};
exports.getMajors = getMajors;
const getMajor = async (id) => {
    return prisma.major.findUnique({ where: { id } });
};
exports.getMajor = getMajor;
