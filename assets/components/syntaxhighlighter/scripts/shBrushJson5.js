/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * JSON5 / JSONC brush
 * Custom brush for the karamble/syntaxhighlighter fork.
 * Like JSON, but allows comments, single-quoted strings, unquoted keys,
 * trailing commas, and hex/Infinity/NaN.
 *
 * @license LGPL v3 or later
 */
;(function()
{
    typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

    function Brush()
    {
        var constants = 'true false null Infinity NaN';

        this.regexList = [
            { regex: SyntaxHighlighter.regexLib.singleLineCComments,        css: 'comments' },
            { regex: SyntaxHighlighter.regexLib.multiLineCComments,         css: 'comments' },
            { regex: /"(?:[^"\\]|\\.)*"\s*(?=:)/g,                          css: 'variable bold' },
            { regex: /'(?:[^'\\]|\\.)*'\s*(?=:)/g,                          css: 'variable bold' },
            { regex: /\b[A-Za-z_$][A-Za-z0-9_$]*\s*(?=:)/g,                 css: 'variable bold' },
            { regex: SyntaxHighlighter.regexLib.doubleQuotedString,         css: 'string'   },
            { regex: SyntaxHighlighter.regexLib.singleQuotedString,         css: 'string'   },
            { regex: /-?\b0[xX][0-9a-fA-F]+\b/g,                            css: 'color2 bold' },
            { regex: /[+-]?\b\d+(\.\d+)?([eE][+-]?\d+)?\b/g,                css: 'color2 bold' },
            { regex: new RegExp(this.getKeywords(constants), 'gm'),         css: 'constants bold' }
        ];
    };

    Brush.prototype = new SyntaxHighlighter.Highlighter();
    Brush.aliases   = ['json5', 'jsonc'];

    SyntaxHighlighter.brushes.Json5 = Brush;

    typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
