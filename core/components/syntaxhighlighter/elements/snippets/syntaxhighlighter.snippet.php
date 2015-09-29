<?php
/**
 * SyntaxHighlighter snippet
 *
 * Copyright 2011 Bob Ray <http://bobsguides.com>
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
 * MODx SyntaxHighlighter snippet
 *
 * Description: Revolution version of Alex Gorbatchev's Syntax Highlighter JS script
 *
 * @package syntaxhighlighter
 *
 * @property brushes (string) comma-separated list of brushes to load
 * @property theme (string) name of theme (Default, Django, Eclipse, Emacs, FadeToGrey, MDUltra, Midnight, RDark)
 */

/* only do this if you need lexicon strings */
//$modx->lexicon->load('syntaxhighlighter:default');

$brushes = empty($scriptProperties['brushes'])? 'JScript,Xml,Php,Css,Plain' : $scriptProperties['brushes'];
$theme = empty($scriptProperties['theme'])? 'Default' : $scriptProperties['theme'];

$brushArray = explode(',', $brushes);

$baseURL = $modx->getOption('sh.assets_url', null, $modx->getOption('assets_url') . 'components/syntaxhighlighter/');

$modx->regClientStartupScript($baseURL . 'scripts/shCore.js');

foreach($brushArray as $brush) {
    $modx->regClientStartupScript($baseURL . 'scripts/' . 'shBrush' . $brush . '.js');
}

$modx->regClientCss($baseURL . 'css/' . 'shCore.css' );
$modx->regClientCss($baseURL . 'css/' . "shTheme$theme.css" );
$modx->regClientScript('<script type="text/javascript">
     SyntaxHighlighter.all();
</script>');

return '';
