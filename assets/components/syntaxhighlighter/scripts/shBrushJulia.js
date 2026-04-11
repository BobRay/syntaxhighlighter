/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * Julia brush
 * Custom brush for the karamble/syntaxhighlighter fork.
 *
 * @license LGPL v3 or later
 */
;(function()
{
    typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

    function Brush()
    {
        var keywords = 'abstract baremodule begin break catch ccall const continue do else elseif end export false finally for function global if import importall in isa let local macro module mutable primitive quote return struct throw true try type using where while';
        var types    = 'Int Int8 Int16 Int32 Int64 Int128 UInt UInt8 UInt16 UInt32 UInt64 UInt128 Float16 Float32 Float64 Bool Char String Symbol Array Vector Matrix Tuple Dict Set NamedTuple Nothing Missing Any Number Real Integer AbstractFloat AbstractString';
        var constants = 'true false nothing missing pi MathConstants';

        this.regexList = [
            { regex: SyntaxHighlighter.regexLib.singleLinePerlComments,     css: 'comments' },
            { regex: /#=[\s\S]*?=#/g,                                       css: 'comments' },
            { regex: /"""[\s\S]*?"""/g,                                     css: 'string'   },
            { regex: SyntaxHighlighter.regexLib.doubleQuotedString,         css: 'string'   },
            { regex: /'(?:[^'\\]|\\.)'/g,                                   css: 'string'   },
            { regex: /-?\b0[xX][0-9a-fA-F]+\b/g,                            css: 'color2 bold' },
            { regex: /-?\b\d+(\.\d+)?([eE][+-]?\d+)?\b/g,                   css: 'color2 bold' },
            { regex: /@[a-zA-Z_][a-zA-Z0-9_!]*/g,                           css: 'preprocessor bold' },
            { regex: new RegExp(this.getKeywords(constants), 'gm'),         css: 'constants bold' },
            { regex: new RegExp(this.getKeywords(types),     'gm'),         css: 'color1 bold' },
            { regex: new RegExp(this.getKeywords(keywords),  'gm'),         css: 'keyword bold' }
        ];
    };

    Brush.prototype = new SyntaxHighlighter.Highlighter();
    Brush.aliases   = ['julia', 'jl'];

    SyntaxHighlighter.brushes.Julia = Brush;

    typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
