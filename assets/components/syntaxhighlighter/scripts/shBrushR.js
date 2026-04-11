/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * R brush
 * Custom brush for the karamble/syntaxhighlighter fork.
 *
 * @license LGPL v3 or later
 */
;(function()
{
    typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

    function Brush()
    {
        var keywords = 'if else for while repeat function return in next break library require source';
        var builtins = 'c list vector matrix array data.frame factor NULL NA NaN length nrow ncol dim names rownames colnames lapply sapply mapply apply tapply by aggregate merge subset transform within with do.call print cat paste paste0 sprintf format seq rep sum mean median min max range sd var cor cov';
        var constants = 'TRUE FALSE T F NULL NA NaN Inf NA_integer_ NA_real_ NA_character_ NA_complex_';

        this.regexList = [
            { regex: SyntaxHighlighter.regexLib.singleLinePerlComments,     css: 'comments' },
            { regex: SyntaxHighlighter.regexLib.doubleQuotedString,         css: 'string'   },
            { regex: SyntaxHighlighter.regexLib.singleQuotedString,         css: 'string'   },
            { regex: /-?\b\d+(\.\d+)?([eE][+-]?\d+)?[Li]?\b/g,              css: 'color2 bold' },
            { regex: /<<?-|->>?|%[^%\s]*%/g,                                css: 'preprocessor bold' },
            { regex: new RegExp(this.getKeywords(constants), 'gm'),         css: 'constants bold' },
            { regex: new RegExp(this.getKeywords(builtins),  'gm'),         css: 'functions' },
            { regex: new RegExp(this.getKeywords(keywords),  'gm'),         css: 'keyword bold' }
        ];
    };

    Brush.prototype = new SyntaxHighlighter.Highlighter();
    Brush.aliases   = ['r', 'rscript'];

    SyntaxHighlighter.brushes.R = Brush;

    typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
