export default function ({ types: t }) {
  return {
    visitor: {
      BinaryExpression: {
        enter(path) {
          // if (path.node.left.name === 'x') return
          // 判断当前的 BinaryExpression 是不是接在一个 return 后面
          if (t.isReturnStatement(path.parent)) {
            path.replaceWith(
              t.binaryExpression(path.node.operator, t.identifier("x"), t.identifier("x"))
            );
            path.skip()
          }
        },
      },
    },
  };
}
