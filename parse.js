const babelParser = require("@babel/parser");
const traverse = require("@babel/traverse");
const t = require("@babel/types");
const generator = require("@babel/generator");

let code = `function square(n) {
  return n * n;
}`;

const ast = babelParser.parse(code, {
  sourceType: "module", // default: "script"
  plugins: [], // default: [] can use ["jsx",......]
});

/**
 * use options to traverse JSX
 */
// const code = `<div>{123}</div>`;

// const ast = babelParser.parse(code,{
//   sourceType: "module", // default: "script"
//   plugins: ["jsx"] // default: [] can use ["jsx",......]
// });

// console.log(ast.program.body);

/**
 * traverse
 */
traverse.default(ast, {
  // FunctionDeclaration(path) {
  //   path.node.id.name = "x";
  // },

  // ======== same as =======
  // FunctionDeclaration: {
  //   enter(path) {
  //     path.node.id.name = "x";
  //   },
  // },

  enter(path) {
    if (t.isIdentifier(path.node, { name: "n" })) {
      path.node.name = "x";
    }
  },
});

/**
 * generator
 */
const result = generator.default(
  ast,
  {
    /* options */
    sourceMaps: true,
  },
  code
);

console.log(result);
