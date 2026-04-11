/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * Zig brush
 * Custom brush for the karamble/syntaxhighlighter fork.
 *
 * @license LGPL v3 or later
 */
;(function()
{
    typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

    function Brush()
    {
        var keywords = 'align allowzero and anyframe anytype asm async await break callconv catch comptime const continue defer else enum errdefer error export extern fn for if inline noalias noinline nosuspend opaque or orelse packed pub resume return linksection struct suspend switch test threadlocal try union unreachable usingnamespace var volatile while';
        var types    = 'bool void noreturn type anyerror comptime_int comptime_float c_short c_ushort c_int c_uint c_long c_ulong c_longlong c_ulonglong c_longdouble c_void f16 f32 f64 f128 isize usize i8 i16 i32 i64 i128 u8 u16 u32 u64 u128';
        var constants = 'true false null undefined';
        var builtins  = '@import @cImport @cInclude @sizeOf @alignOf @as @ptrCast @intCast @floatCast @typeOf @TypeOf @hasField @hasDecl @field @memcpy @memset @panic @print';

        this.regexList = [
            { regex: SyntaxHighlighter.regexLib.singleLineCComments,        css: 'comments' },
            { regex: SyntaxHighlighter.regexLib.doubleQuotedString,         css: 'string'   },
            { regex: SyntaxHighlighter.regexLib.singleQuotedString,         css: 'string'   },
            { regex: /\\\\.*$/gm,                                           css: 'string'   },
            { regex: /-?\b0[xX][0-9a-fA-F_]+\b/g,                           css: 'color2 bold' },
            { regex: /-?\b0[bB][01_]+\b/g,                                  css: 'color2 bold' },
            { regex: /-?\b\d[\d_]*(\.\d[\d_]*)?([eE][+-]?\d+)?\b/g,         css: 'color2 bold' },
            { regex: /@[a-zA-Z_][a-zA-Z0-9_]*/g,                            css: 'functions bold' },
            { regex: new RegExp(this.getKeywords(constants), 'gm'),         css: 'constants bold' },
            { regex: new RegExp(this.getKeywords(types),     'gm'),         css: 'color1 bold' },
            { regex: new RegExp(this.getKeywords(keywords),  'gm'),         css: 'keyword bold' }
        ];
    };

    Brush.prototype = new SyntaxHighlighter.Highlighter();
    Brush.aliases   = ['zig'];

    SyntaxHighlighter.brushes.Zig = Brush;

    typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
