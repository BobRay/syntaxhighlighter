/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * JSON brush
 * Custom brush for SingularityByte. Highlights JSON keys, strings,
 * numbers, booleans, and null.
 *
 * @license LGPL v3 or later
 */
;(function()
{
    typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

    function Brush()
    {
        var constants = 'true false null';

        this.regexList = [
            { regex: /"([^"\\]|\\.)*"\s*(?=:)/g,                          css: 'variable bold' },
            { regex: SyntaxHighlighter.regexLib.doubleQuotedString,       css: 'string'   },
            { regex: /-?\b\d+(\.\d+)?([eE][+-]?\d+)?\b/g,                 css: 'color2 bold' },
            { regex: new RegExp(this.getKeywords(constants), 'gmi'),      css: 'constants bold' },
            { regex: /(\{|\}|\[|\]|,|:)/g,                                css: 'plain' }
        ];
    };

    Brush.prototype = new SyntaxHighlighter.Highlighter();
    Brush.aliases   = ['json'];

    SyntaxHighlighter.brushes.Json = Brush;

    typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
