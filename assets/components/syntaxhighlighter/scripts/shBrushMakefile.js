/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * Makefile brush
 * Custom brush for the karamble/syntaxhighlighter fork.
 *
 * @license LGPL v3 or later
 */
;(function()
{
    typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

    function Brush()
    {
        var directives = 'include sinclude define endef ifdef ifndef ifeq ifneq else endif export unexport override vpath';
        var specials   = '.PHONY .SUFFIXES .DEFAULT .PRECIOUS .INTERMEDIATE .SECONDARY .DELETE_ON_ERROR .IGNORE .LOW_RESOLUTION_TIME .SILENT .EXPORT_ALL_VARIABLES .NOTPARALLEL .ONESHELL .POSIX';
        var functions  = 'subst patsubst strip findstring filter filter-out sort word wordlist words firstword lastword dir notdir suffix basename addsuffix addprefix join wildcard realpath abspath if or and foreach call value eval origin flavor shell error warning info';

        this.regexList = [
            { regex: SyntaxHighlighter.regexLib.singleLinePerlComments,     css: 'comments' },
            { regex: SyntaxHighlighter.regexLib.doubleQuotedString,         css: 'string'   },
            { regex: SyntaxHighlighter.regexLib.singleQuotedString,         css: 'string'   },
            { regex: /\$[\(\{][^\)\}]+[\)\}]/g,                             css: 'variable bold' },
            { regex: /\$[@<^*?+|]/g,                                        css: 'variable bold' },
            { regex: /^[A-Za-z0-9_./%-]+\s*::?(?!=)/gm,                     css: 'keyword bold' },
            { regex: /^[A-Z_][A-Z0-9_]*\s*[:?+]?=/gm,                       css: 'preprocessor' },
            { regex: new RegExp(this.getKeywords(specials),   'gm'),        css: 'color1 bold' },
            { regex: new RegExp(this.getKeywords(directives), 'gm'),        css: 'keyword bold' },
            { regex: new RegExp('\\b(' + functions.split(' ').join('|') + ')\\b', 'gm'), css: 'functions' }
        ];
    };

    Brush.prototype = new SyntaxHighlighter.Highlighter();
    Brush.aliases   = ['makefile', 'make'];

    SyntaxHighlighter.brushes.Makefile = Brush;

    typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
