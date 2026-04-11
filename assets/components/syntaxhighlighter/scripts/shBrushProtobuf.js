/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * Protocol Buffers (protobuf) brush
 * Custom brush for the karamble/syntaxhighlighter fork.
 *
 * @license LGPL v3 or later
 */
;(function()
{
    typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

    function Brush()
    {
        var keywords = 'syntax package import option message enum service rpc returns oneof map repeated optional required reserved extensions extend group public weak';
        var types    = 'int32 int64 uint32 uint64 sint32 sint64 fixed32 fixed64 sfixed32 sfixed64 float double bool string bytes';
        var constants = 'true false';

        this.regexList = [
            { regex: SyntaxHighlighter.regexLib.singleLineCComments,        css: 'comments' },
            { regex: SyntaxHighlighter.regexLib.multiLineCComments,         css: 'comments' },
            { regex: SyntaxHighlighter.regexLib.doubleQuotedString,         css: 'string'   },
            { regex: SyntaxHighlighter.regexLib.singleQuotedString,         css: 'string'   },
            { regex: /-?\b\d+(\.\d+)?\b/g,                                  css: 'color2 bold' },
            { regex: new RegExp(this.getKeywords(constants), 'gm'),         css: 'constants bold' },
            { regex: new RegExp(this.getKeywords(types),     'gm'),         css: 'color1 bold' },
            { regex: new RegExp(this.getKeywords(keywords),  'gm'),         css: 'keyword bold' }
        ];
    };

    Brush.prototype = new SyntaxHighlighter.Highlighter();
    Brush.aliases   = ['protobuf', 'proto'];

    SyntaxHighlighter.brushes.Protobuf = Brush;

    typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
