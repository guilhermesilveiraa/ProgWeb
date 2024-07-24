
import Handlebars from 'handlebars';
import { Technologie } from './helpersTypes';

Handlebars.registerHelper('listNodeJsTechnologies', function(technologies: Technologie[], options) {
  const nodeJsTechnologies = technologies.filter(tech => tech.poweredByNodejs);
  let result = '<ul>';
  nodeJsTechnologies.forEach(tech => {
    result += `<li>${tech.name} - ${tech.type}</li>`;
  });
  result += '</ul>';
  return new Handlebars.SafeString(result);
});
