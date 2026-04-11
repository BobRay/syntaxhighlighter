/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * Dockerfile brush
 * Custom brush for SingularityByte. Highlights Dockerfile instructions,
 * comments, strings, and variable substitutions.
 *
 * @license LGPL v3 or later
 */
;(function()
{
    typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

    function Brush()
    {
        var instructions = 'FROM MAINTAINER RUN CMD LABEL EXPOSE ENV ADD COPY ENTRYPOINT VOLUME USER WORKDIR ARG ONBUILD STOPSIGNAL HEALTHCHECK SHELL';

        this.regexList = [
            { regex: SyntaxHighlighter.regexLib.singleLinePerlComments,    css: 'comments' },
            { regex: SyntaxHighlighter.regexLib.doubleQuotedString,        css: 'string'   },
            { regex: SyntaxHighlighter.regexLib.singleQuotedString,        css: 'string'   },
            { regex: /\$\{?[a-zA-Z_][a-zA-Z0-9_]*\}?/g,                    css: 'variable' },
            { regex: new RegExp('^\\s*(' + instructions.split(' ').join('|') + ')\\b', 'gmi'), css: 'keyword bold' },
            { regex: /\\\s*$/gm,                                           css: 'preprocessor' }
        ];
    };

    Brush.prototype = new SyntaxHighlighter.Highlighter();
    Brush.aliases   = ['dockerfile', 'docker'];

    SyntaxHighlighter.brushes.Dockerfile = Brush;

    typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
