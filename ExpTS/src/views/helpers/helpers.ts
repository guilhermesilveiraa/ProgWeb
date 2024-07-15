import { Techs } from "./helpersTypes"

export function listTechs(techs : Techs[]) {
    return `<ul>${techs.map((tech)=> `<li>${tech.name} - ${tech.type}</li>`).join("")}<ul>`
}