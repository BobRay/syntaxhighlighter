/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * TOML brush
 * Custom brush for the karamble/syntaxhighlighter fork.
 *
 * @license LGPL v3 or later
 */
;(function()
{
    typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

    function Brush()
    {
        var constants = 'true false';

        this.regexList = [
            { regex: SyntaxHighlighter.regexLib.singleLinePerlComments,     css: 'comments' },
            { regex: /"""[\s\S]*?"""/g,                                     css: 'string'   },
            { regex: /'''[\s\S]*?'''/g,                                     css: 'string'   },
            { regex: SyntaxHighlighter.regexLib.doubleQuotedString,         css: 'string'   },
            { regex: SyntaxHighlighter.regexLib.singleQuotedString,         css: 'string'   },
            { regex: /^\s*\[\[?[^\]]+\]\]?/gm,                              css: 'preprocessor bold' },
            { regex: /^\s*[A-Za-z0-9_.\-]+(?=\s*=)/gm,                      css: 'variable' },
            { regex: /\b\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?)?\b/g, css: 'color3' },
            { regex: /-?\b0[xX][0-9a-fA-F_]+\b/g,                           css: 'color2 bold' },
            { regex: /-?\b\d[\d_]*(\.\d[\d_]*)?([eE][+-]?\d+)?\b/g,         css: 'color2 bold' },
            { regex: new RegExp(this.getKeywords(constants), 'gm'),         css: 'constants bold' }
        ];
    };

    Brush.prototype = new SyntaxHighlighter.Highlighter();
    Brush.aliases   = ['toml'];

    SyntaxHighlighter.brushes.Toml = Brush;

    typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
