const customSvgTemplate = (variables, { tpl }) => {
  return tpl`
${variables.imports};

${variables.interfaces};

const ${variables.componentName} = (${variables.props}) => (
  ${variables.jsx}
);
 
export { ${variables.componentName} };
`
}

module.exports = customSvgTemplate
