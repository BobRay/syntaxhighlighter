/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * YAML brush
 * Originally contributed by Nicolas Perriault
 * Source: https://gist.github.com/nijikokun/1131094
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @license LGPL v3 or later
 */
;(function()
{
    typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

    function Brush()
    {
        var constants = 'true false yes no on off null ~';

        this.regexList = [
            { regex: SyntaxHighlighter.regexLib.singleLinePerlComments,         css: 'comments' },
            { regex: SyntaxHighlighter.regexLib.doubleQuotedString,             css: 'string'   },
            { regex: SyntaxHighlighter.regexLib.singleQuotedString,             css: 'string'   },
            { regex: /^\s*([a-z0-9\._-])+\s*:/gmi,                              css: 'variable' },
            { regex: /\s(@|:)([a-z0-9\._-])+\s*$/gmi,                           css: 'variable bold' },
            { regex: /\s+\d+(\.\d+)?\s*$/gm,                                    css: 'color2 bold' },
            { regex: /(\{|\}|\[|\]|,|~|:)/gm,                                   css: 'constants' },
            { regex: /^\s*-\s/gm,                                               css: 'string bold' },
            { regex: /^---/gm,                                                  css: 'string bold' },
            { regex: new RegExp(this.getKeywords(constants), 'gmi'),            css: 'constants' }
        ];
    };

    Brush.prototype = new SyntaxHighlighter.Highlighter();
    Brush.aliases   = ['yaml', 'yml'];

    SyntaxHighlighter.brushes.Yaml = Brush;

    typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
