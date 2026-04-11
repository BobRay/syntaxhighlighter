/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * TypeScript brush
 * Custom brush for the karamble/syntaxhighlighter fork.
 * Adds TypeScript-specific keywords on top of standard JavaScript.
 *
 * @license LGPL v3 or later
 */
;(function()
{
    typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

    function Brush()
    {
        var keywords = 'break case catch class const continue debugger default delete do else enum export extends false finally for function if import in instanceof new null return super switch this throw true try typeof var void while with yield ' +
                       'abstract as async await constructor declare from get implements interface is keyof let module namespace of package private protected public readonly require set static type infer never unknown';
        var types    = 'any bigint boolean number object string symbol undefined void Array Promise Map Set ReadonlyArray Record Partial Required Readonly Pick Omit Exclude Extract NonNullable Parameters ReturnType';
        var constants = 'true false null undefined Infinity NaN globalThis';

        this.regexList = [
            { regex: SyntaxHighlighter.regexLib.singleLineCComments,        css: 'comments' },
            { regex: SyntaxHighlighter.regexLib.multiLineCComments,         css: 'comments' },
            { regex: SyntaxHighlighter.regexLib.doubleQuotedString,         css: 'string'   },
            { regex: SyntaxHighlighter.regexLib.singleQuotedString,         css: 'string'   },
            { regex: /`(?:[^`\\]|\\.|\$\{[^}]*\})*`/g,                      css: 'string'   },
            { regex: /@[a-zA-Z_][a-zA-Z0-9_]*/g,                            css: 'preprocessor' },
            { regex: /-?\b\d+(\.\d+)?([eE][+-]?\d+)?n?\b/g,                 css: 'color2 bold' },
            { regex: new RegExp(this.getKeywords(constants), 'gm'),         css: 'constants bold' },
            { regex: new RegExp(this.getKeywords(types),     'gm'),         css: 'color1 bold' },
            { regex: new RegExp(this.getKeywords(keywords),  'gm'),         css: 'keyword bold' }
        ];
    };

    Brush.prototype = new SyntaxHighlighter.Highlighter();
    Brush.aliases   = ['typescript', 'ts', 'tsx'];

    SyntaxHighlighter.brushes.TypeScript = Brush;

    typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
