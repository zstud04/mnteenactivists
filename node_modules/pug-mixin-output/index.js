
const plugin = {
    preCodeGen: function (ast, pug) {
        ast.nodes.unshift({
            type: 'Code',
            // language=JS
            val: `function __getMixinOutput(mixinName) {
    if (!pug_mixins[mixinName]) {
      return;
    }
    
    let args = Array.from(arguments);
    args.shift();
    
    pug_mixins[mixinName].apply(pug_mixins[mixinName], args);
    
    const result = pug_html.replace(beforeHtml, '');
    
    pug_html = beforeHtml;
    return result;
}`,
            buffer: false,
            mustEscape: false,
            isInline: false,
            line: 0,
            column: 0,
            filename: 'PugPlugin'
        });

        let nodes = ast.nodes.slice();

        while (nodes.length > 0) {
            const node = nodes.shift();

            if (Array.isArray(node.nodes)) {
                nodes = nodes.concat(node.nodes);
            }
            else if (node.consequent) {
                if (Array.isArray(node.consequent.nodes)) {
                    nodes = nodes.concat(node.consequent.nodes);
                }
            }
            else if (node.block) {
                if (Array.isArray(node.block.nodes)) {
                    nodes = nodes.concat(node.block.nodes);
                }
            }

            if (node.type !== 'Code') {
                continue;
            }


            let val = node.val;
            let pattern = /\+([a-zA-Z_$][\w$]*)\(/g;
            let matches = pattern.exec(node.val);

            if (matches) {
                for (let i = 1; i < matches.length; i++) {
                    val = val.replace('+' + matches[i] + '()', '__getMixinOutput(\'' + matches[i] + '\')');
                    val = val.replace('+' + matches[i] + '(', '__getMixinOutput(\'' + matches[i] + '\',');
                }

                node.val = val;
            }

            pattern = /\+([a-zA-Z_$][\w$]*)/g;
            matches = pattern.exec(node.val);

            if (matches) {
                for (let i = 1; i < matches.length; i++) {
                    val = val.replace('+' + matches[i], '__getMixinOutput(\'' + matches[i] + '\')');
                }

                node.val = val;
            }
        }

        return ast;
    }
};

module.exports = plugin;