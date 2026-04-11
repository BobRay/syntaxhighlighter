/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * Go (golang) brush
 * Custom brush for the karamble/syntaxhighlighter fork.
 * Highlights Go keywords, built-in types and functions, constants,
 * single-line and block comments, strings (including raw backtick strings),
 * and numeric literals.
 *
 * @license LGPL v3 or later
 */
;(function()
{
    typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

    function Brush()
    {
        var keywords = 'break case chan const continue default defer else fallthrough for func go goto ' +
                       'if import interface map package range return select struct switch type var';

        var types    = 'bool byte complex64 complex128 error float32 float64 int int8 int16 int32 int64 ' +
                       'rune string uint uint8 uint16 uint32 uint64 uintptr any';

        var builtins = 'append cap close complex copy delete imag len make new panic print println real recover';

        var constants = 'true false iota nil';

        this.regexList = [
            { regex: SyntaxHighlighter.regexLib.singleLineCComments,           css: 'comments' },
            { regex: SyntaxHighlighter.regexLib.multiLineCComments,            css: 'comments' },
            { regex: SyntaxHighlighter.regexLib.doubleQuotedString,            css: 'string'   },
            { regex: SyntaxHighlighter.regexLib.singleQuotedString,            css: 'string'   },
            { regex: /`[^`]*`/g,                                               css: 'string'   },
            { regex: /-?\b0[xX][0-9a-fA-F]+\b/g,                               css: 'color2 bold' },
            { regex: /-?\b\d+(\.\d+)?([eE][+-]?\d+)?i?\b/g,                    css: 'color2 bold' },
            { regex: new RegExp(this.getKeywords(constants), 'gm'),            css: 'constants bold' },
            { regex: new RegExp(this.getKeywords(types),     'gm'),            css: 'color1 bold' },
            { regex: new RegExp(this.getKeywords(builtins),  'gm'),            css: 'functions bold' },
            { regex: new RegExp(this.getKeywords(keywords),  'gm'),            css: 'keyword bold' }
        ];
    };

    Brush.prototype = new SyntaxHighlighter.Highlighter();
    Brush.aliases   = ['go', 'golang'];

    SyntaxHighlighter.brushes.Go = Brush;

    typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
