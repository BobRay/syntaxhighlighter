<?php
/**
 * SyntaxHighlighter plugin
 *
 * Copyright 2011-2015 Bob Ray <http://bobsguides.com>
 *
 * @author Bob Ray <http://bobsguides.com>
 * @version Version 1.0.0 Beta-1
 * 11/07/2011
 *
 * SyntaxHighlighter is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 2 of the License, or (at your option) any
 * later version.
 *
 * SyntaxHighlighter is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * SyntaxHighlighter; if not, write to the Free Software Foundation, Inc., 59 Temple
 * Place, Suite 330, Boston, MA 02111-1307 USA
 *
 * @package syntaxhighlighter
 */

/**
 * MODx SyntaxHighlighter plugin
 *
 * Description: Revolution version of Alex Gorbatchev's Syntax Highlighter JS script
 * Events: OnLoadWebDocument
 *
 * @package syntaxhighlighter
 *
 * @property $brushes (string) comma-separated list of brushes to load (AppleScript, AS3, Bash, ColdFusion, Cpp, CSharp, Css, Delphi, Diff, Erlang, Groovy, Java, JavaFX, JScript, Perl, Php, Plain, PowerShell, Python, Ruby, Sass, Scala, Sql, Vb, Xml_
 *
 * @property $theme (string) name of theme (Default, Django, Eclipse, Emacs, FadeToGrey, MDUltra, Midnight, RDark)
 */

/** @var  $modx modX */
/** @var  $scriptProperties array */


$default_theme = $modx->getOption('syntaxhighlighter.theme', null, 'Default', true);
$theme = $modx->getOption('theme', $scriptProperties, '', true);
$theme = !empty($theme) ? $theme : $default_theme;

$brushes = empty($scriptProperties['brushes'])? 'JScript,Xml,Php,Css,Plain' : $scriptProperties['brushes'];

$brushArray = explode(',', $brushes);

$baseURL = $modx->getOption('sh.assets_url', null, $modx->getOption('assets_url') . 'components/syntaxhighlighter/');

$modx->regClientStartupScript($baseURL . 'scripts/shCore.js');

foreach($brushArray as $brush) {
    $modx->regClientStartupScript($baseURL . 'scripts/' . 'shBrush' . $brush . '.js');
}

$modx->regClientCss($baseURL . 'css/' . 'core.css' );
$modx->regClientCss($baseURL . 'css/theme/' . "$theme.css" );
$modx->regClientScript('<script type="text/javascript">
     SyntaxHighlighter.all();
</script>');

return '';

