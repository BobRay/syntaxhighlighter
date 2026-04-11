/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * GraphQL brush
 * Custom brush for the karamble/syntaxhighlighter fork.
 *
 * @license LGPL v3 or later
 */
;(function()
{
    typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

    function Brush()
    {
        var keywords = 'query mutation subscription fragment type interface union enum input scalar schema directive on implements extend';
        var types    = 'Int Float String Boolean ID';
        var constants = 'true false null';

        this.regexList = [
            { regex: SyntaxHighlighter.regexLib.singleLinePerlComments,     css: 'comments' },
            { regex: /"""[\s\S]*?"""/g,                                     css: 'comments' },
            { regex: SyntaxHighlighter.regexLib.doubleQuotedString,         css: 'string'   },
            { regex: /\$[a-zA-Z_][a-zA-Z0-9_]*/g,                           css: 'variable bold' },
            { regex: /@[a-zA-Z_][a-zA-Z0-9_]*/g,                            css: 'preprocessor bold' },
            { regex: /-?\b\d+(\.\d+)?\b/g,                                  css: 'color2 bold' },
            { regex: new RegExp(this.getKeywords(constants), 'gm'),         css: 'constants bold' },
            { regex: new RegExp(this.getKeywords(types),     'gm'),         css: 'color1 bold' },
            { regex: new RegExp(this.getKeywords(keywords),  'gm'),         css: 'keyword bold' }
        ];
    };

    Brush.prototype = new SyntaxHighlighter.Highlighter();
    Brush.aliases   = ['graphql', 'gql'];

    SyntaxHighlighter.brushes.GraphQL = Brush;

    typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
