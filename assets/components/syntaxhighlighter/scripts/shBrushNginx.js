/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * Nginx configuration brush
 * Custom brush for the karamble/syntaxhighlighter fork.
 *
 * @license LGPL v3 or later
 */
;(function()
{
    typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

    function Brush()
    {
        var blocks = 'http server location upstream events mail stream if map geo split_clients limit_req_zone limit_conn_zone types charset_map perl_set';
        var directives = 'listen server_name root index try_files rewrite return alias proxy_pass proxy_set_header proxy_redirect proxy_buffering proxy_buffer_size proxy_buffers proxy_busy_buffers_size proxy_read_timeout proxy_connect_timeout proxy_send_timeout proxy_http_version proxy_cache proxy_cache_path proxy_cache_key proxy_cache_valid fastcgi_pass fastcgi_param fastcgi_index fastcgi_buffers fastcgi_buffer_size fastcgi_read_timeout uwsgi_pass scgi_pass include access_log error_log error_page log_format gzip gzip_types gzip_min_length gzip_proxied gzip_vary client_max_body_size client_body_buffer_size keepalive_timeout sendfile tcp_nopush tcp_nodelay add_header expires set_real_ip_from real_ip_header ssl_certificate ssl_certificate_key ssl_protocols ssl_ciphers ssl_session_cache ssl_session_timeout ssl_prefer_server_ciphers ssl_dhparam resolver autoindex auth_basic auth_basic_user_file deny allow internal default_type types_hash_max_size server_tokens user worker_processes worker_connections multi_accept use pid';

        this.regexList = [
            { regex: SyntaxHighlighter.regexLib.singleLinePerlComments,     css: 'comments' },
            { regex: SyntaxHighlighter.regexLib.doubleQuotedString,         css: 'string'   },
            { regex: SyntaxHighlighter.regexLib.singleQuotedString,         css: 'string'   },
            { regex: /\$[a-zA-Z_][a-zA-Z0-9_]*/g,                           css: 'variable bold' },
            { regex: /\b\d+[kKmMgG]?\b/g,                                   css: 'color2 bold' },
            { regex: /[~=!\^\$]\*?/g,                                       css: 'preprocessor' },
            { regex: new RegExp(this.getKeywords(blocks),     'gm'),        css: 'keyword bold' },
            { regex: new RegExp(this.getKeywords(directives), 'gm'),        css: 'functions' }
        ];
    };

    Brush.prototype = new SyntaxHighlighter.Highlighter();
    Brush.aliases   = ['nginx'];

    SyntaxHighlighter.brushes.Nginx = Brush;

    typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
