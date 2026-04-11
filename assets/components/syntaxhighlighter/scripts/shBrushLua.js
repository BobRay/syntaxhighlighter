/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * Lua brush
 * Custom brush for the karamble/syntaxhighlighter fork.
 *
 * @license LGPL v3 or later
 */
;(function()
{
    typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

    function Brush()
    {
        var keywords = 'and break do else elseif end for function goto if in local not or repeat return then until while';
        var builtins = 'assert collectgarbage dofile error getmetatable ipairs load loadfile next pairs pcall print rawequal rawget rawlen rawset require select setmetatable tonumber tostring type unpack xpcall string table math io os package coroutine debug';
        var constants = 'true false nil _G _ENV _VERSION';

        this.regexList = [
            { regex: /--\[\[[\s\S]*?\]\]/g,                                 css: 'comments' },
            { regex: /--.*$/gm,                                             css: 'comments' },
            { regex: /\[\[[\s\S]*?\]\]/g,                                   css: 'string'   },
            { regex: SyntaxHighlighter.regexLib.doubleQuotedString,         css: 'string'   },
            { regex: SyntaxHighlighter.regexLib.singleQuotedString,         css: 'string'   },
            { regex: /-?\b0[xX][0-9a-fA-F]+\b/g,                            css: 'color2 bold' },
            { regex: /-?\b\d+(\.\d+)?([eE][+-]?\d+)?\b/g,                   css: 'color2 bold' },
            { regex: new RegExp(this.getKeywords(constants), 'gm'),         css: 'constants bold' },
            { regex: new RegExp(this.getKeywords(builtins),  'gm'),         css: 'functions' },
            { regex: new RegExp(this.getKeywords(keywords),  'gm'),         css: 'keyword bold' }
        ];
    };

    Brush.prototype = new SyntaxHighlighter.Highlighter();
    Brush.aliases   = ['lua'];

    SyntaxHighlighter.brushes.Lua = Brush;

    typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
