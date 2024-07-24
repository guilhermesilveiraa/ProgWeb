"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handlebars_1 = __importDefault(require("handlebars"));
handlebars_1.default.registerHelper('listNodeJsTechnologies', function (technologies, options) {
    const nodeJsTechnologies = technologies.filter(tech => tech.poweredByNodejs);
    let result = '<ul>';
    nodeJsTechnologies.forEach(tech => {
        result += `<li>${tech.name} - ${tech.type}</li>`;
    });
    result += '</ul>';
    return new handlebars_1.default.SafeString(result);
});
