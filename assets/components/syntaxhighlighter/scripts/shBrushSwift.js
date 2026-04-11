/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * Swift brush
 * Custom brush for the karamble/syntaxhighlighter fork.
 *
 * @license LGPL v3 or later
 */
;(function()
{
    typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

    function Brush()
    {
        var keywords = 'associatedtype class deinit enum extension fileprivate func import init inout internal let open operator private precedencegroup protocol public rethrows static struct subscript typealias var ' +
                       'break case catch continue default defer do else fallthrough for guard if in repeat return throw switch where while ' +
                       'as Any catch false is nil rethrows self Self super throw throws true try ' +
                       'async await actor isolated nonisolated mutating nonmutating override final lazy weak unowned indirect convenience required dynamic';
        var types    = 'Int Int8 Int16 Int32 Int64 UInt UInt8 UInt16 UInt32 UInt64 Float Double Bool String Character Array Dictionary Set Optional AnyObject';
        var constants = 'true false nil';

        this.regexList = [
            { regex: SyntaxHighlighter.regexLib.singleLineCComments,        css: 'comments' },
            { regex: SyntaxHighlighter.regexLib.multiLineCComments,         css: 'comments' },
            { regex: SyntaxHighlighter.regexLib.doubleQuotedString,         css: 'string'   },
            { regex: /@[a-zA-Z_][a-zA-Z0-9_]*/g,                            css: 'preprocessor bold' },
            { regex: /-?\b0[xX][0-9a-fA-F_]+\b/g,                           css: 'color2 bold' },
            { regex: /-?\b\d[\d_]*(\.\d[\d_]*)?([eE][+-]?\d+)?\b/g,         css: 'color2 bold' },
            { regex: new RegExp(this.getKeywords(constants), 'gm'),         css: 'constants bold' },
            { regex: new RegExp(this.getKeywords(types),     'gm'),         css: 'color1 bold' },
            { regex: new RegExp(this.getKeywords(keywords),  'gm'),         css: 'keyword bold' }
        ];
    };

    Brush.prototype = new SyntaxHighlighter.Highlighter();
    Brush.aliases   = ['swift'];

    SyntaxHighlighter.brushes.Swift = Brush;

    typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
