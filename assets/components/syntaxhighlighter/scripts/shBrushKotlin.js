/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * Kotlin brush
 * Custom brush for the karamble/syntaxhighlighter fork.
 *
 * @license LGPL v3 or later
 */
;(function()
{
    typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

    function Brush()
    {
        var keywords = 'as break class continue do else for fun if in interface is object package return super this throw try typealias typeof val var when while ' +
                       'by catch constructor delegate dynamic field file finally get import init param property receiver set setparam where ' +
                       'abstract actual annotation companion const crossinline data enum expect external final infix inline inner internal lateinit noinline open operator out override private protected public reified sealed suspend tailrec vararg';
        var types    = 'Int Long Short Byte Float Double Char Boolean String Array List Map Set MutableList MutableMap MutableSet Any Unit Nothing';
        var constants = 'true false null';

        this.regexList = [
            { regex: SyntaxHighlighter.regexLib.singleLineCComments,        css: 'comments' },
            { regex: SyntaxHighlighter.regexLib.multiLineCComments,         css: 'comments' },
            { regex: /"""[\s\S]*?"""/g,                                     css: 'string'   },
            { regex: SyntaxHighlighter.regexLib.doubleQuotedString,         css: 'string'   },
            { regex: SyntaxHighlighter.regexLib.singleQuotedString,         css: 'string'   },
            { regex: /@[a-zA-Z_][a-zA-Z0-9_]*/g,                            css: 'preprocessor bold' },
            { regex: /-?\b0[xX][0-9a-fA-F_]+\b/g,                           css: 'color2 bold' },
            { regex: /-?\b\d[\d_]*(\.\d[\d_]*)?([eE][+-]?\d+)?[fFlL]?\b/g,  css: 'color2 bold' },
            { regex: new RegExp(this.getKeywords(constants), 'gm'),         css: 'constants bold' },
            { regex: new RegExp(this.getKeywords(types),     'gm'),         css: 'color1 bold' },
            { regex: new RegExp(this.getKeywords(keywords),  'gm'),         css: 'keyword bold' }
        ];
    };

    Brush.prototype = new SyntaxHighlighter.Highlighter();
    Brush.aliases   = ['kotlin', 'kt'];

    SyntaxHighlighter.brushes.Kotlin = Brush;

    typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
