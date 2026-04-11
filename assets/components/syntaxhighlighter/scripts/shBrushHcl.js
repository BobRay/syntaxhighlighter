/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * HCL / Terraform brush
 * Custom brush for the karamble/syntaxhighlighter fork.
 *
 * @license LGPL v3 or later
 */
;(function()
{
    typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

    function Brush()
    {
        var keywords = 'resource data module provider variable output terraform locals dynamic for_each count depends_on lifecycle provisioner connection backend required_providers required_version';
        var types    = 'string number bool list map object set tuple any';
        var constants = 'true false null';
        var builtins = 'var local module data path terraform self each';

        this.regexList = [
            { regex: SyntaxHighlighter.regexLib.singleLinePerlComments,     css: 'comments' },
            { regex: SyntaxHighlighter.regexLib.singleLineCComments,        css: 'comments' },
            { regex: SyntaxHighlighter.regexLib.multiLineCComments,         css: 'comments' },
            { regex: /<<-?[A-Z]+[\s\S]*?^[A-Z]+/gm,                         css: 'string'   },
            { regex: SyntaxHighlighter.regexLib.doubleQuotedString,         css: 'string'   },
            { regex: /\$\{[^}]+\}/g,                                        css: 'variable bold' },
            { regex: /-?\b\d+(\.\d+)?\b/g,                                  css: 'color2 bold' },
            { regex: new RegExp(this.getKeywords(constants), 'gm'),         css: 'constants bold' },
            { regex: new RegExp(this.getKeywords(types),     'gm'),         css: 'color1 bold' },
            { regex: new RegExp(this.getKeywords(builtins),  'gm'),         css: 'functions' },
            { regex: new RegExp(this.getKeywords(keywords),  'gm'),         css: 'keyword bold' }
        ];
    };

    Brush.prototype = new SyntaxHighlighter.Highlighter();
    Brush.aliases   = ['hcl', 'terraform', 'tf'];

    SyntaxHighlighter.brushes.Hcl = Brush;

    typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
