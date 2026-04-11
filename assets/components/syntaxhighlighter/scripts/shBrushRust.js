/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * Rust brush
 * Custom brush for the karamble/syntaxhighlighter fork.
 *
 * @license LGPL v3 or later
 */
;(function()
{
    typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

    function Brush()
    {
        var keywords = 'as async await break const continue crate dyn else enum extern fn for if impl in let loop match mod move mut pub ref return self Self static struct super trait type unsafe use where while yield';
        var types    = 'bool char str String i8 i16 i32 i64 i128 isize u8 u16 u32 u64 u128 usize f32 f64 Vec Option Result Box Rc Arc HashMap HashSet BTreeMap BTreeSet Cow';
        var constants = 'true false None Some Ok Err';

        this.regexList = [
            { regex: SyntaxHighlighter.regexLib.singleLineCComments,        css: 'comments' },
            { regex: SyntaxHighlighter.regexLib.multiLineCComments,         css: 'comments' },
            { regex: SyntaxHighlighter.regexLib.doubleQuotedString,         css: 'string'   },
            { regex: /'(?:[^'\\]|\\.)'/g,                                   css: 'string'   },
            { regex: /'[a-zA-Z_][a-zA-Z0-9_]*\b/g,                          css: 'color3'   },
            { regex: /[a-zA-Z_][a-zA-Z0-9_]*!/g,                            css: 'functions bold' },
            { regex: /#!?\[[^\]]+\]/g,                                      css: 'preprocessor' },
            { regex: /-?\b0[xX][0-9a-fA-F_]+\b/g,                           css: 'color2 bold' },
            { regex: /-?\b0[bB][01_]+\b/g,                                  css: 'color2 bold' },
            { regex: /-?\b\d[\d_]*(\.\d[\d_]*)?([eE][+-]?\d+)?(f32|f64|i\d+|u\d+|isize|usize)?\b/g, css: 'color2 bold' },
            { regex: new RegExp(this.getKeywords(constants), 'gm'),         css: 'constants bold' },
            { regex: new RegExp(this.getKeywords(types),     'gm'),         css: 'color1 bold' },
            { regex: new RegExp(this.getKeywords(keywords),  'gm'),         css: 'keyword bold' }
        ];
    };

    Brush.prototype = new SyntaxHighlighter.Highlighter();
    Brush.aliases   = ['rust', 'rs'];

    SyntaxHighlighter.brushes.Rust = Brush;

    typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
