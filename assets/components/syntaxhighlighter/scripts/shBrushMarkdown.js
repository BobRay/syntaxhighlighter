/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * Markdown brush
 * Custom brush for the karamble/syntaxhighlighter fork.
 *
 * @license LGPL v3 or later
 */
;(function()
{
    typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

    function Brush()
    {
        this.regexList = [
            { regex: /^#{1,6}\s+.*$/gm,                                     css: 'keyword bold' },
            { regex: /^[-=]{3,}\s*$/gm,                                     css: 'preprocessor bold' },
            { regex: /^\s*[\*\-\+]\s+/gm,                                   css: 'string bold' },
            { regex: /^\s*\d+\.\s+/gm,                                      css: 'string bold' },
            { regex: /^\s*>\s.*$/gm,                                        css: 'comments' },
            { regex: /\*\*[^*\n]+\*\*/g,                                    css: 'color1 bold' },
            { regex: /__[^_\n]+__/g,                                        css: 'color1 bold' },
            { regex: /(?<!\*)\*[^*\n]+\*(?!\*)/g,                           css: 'color3' },
            { regex: /(?<!_)_[^_\n]+_(?!_)/g,                               css: 'color3' },
            { regex: /`[^`\n]+`/g,                                          css: 'string' },
            { regex: /^```[\s\S]*?^```/gm,                                  css: 'string' },
            { regex: /!?\[[^\]]*\]\([^)]+\)/g,                              css: 'variable bold' },
            { regex: /^\s{4,}.*$/gm,                                        css: 'string' }
        ];
    };

    Brush.prototype = new SyntaxHighlighter.Highlighter();
    Brush.aliases   = ['markdown', 'md'];

    SyntaxHighlighter.brushes.Markdown = Brush;

    typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
