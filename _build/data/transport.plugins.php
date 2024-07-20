<?php
/**
 * SyntaxHighlighter transport plugins
 * Copyright 2011-2024 Bob Ray <https://bobsguides.com>
 * @author Bob Ray <https://bobsguides.com>
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
 * Description:  Array of plugin objects for SyntaxHighlighter package
 * @package syntaxhighlighter
 * @subpackage build
 */

if (! function_exists('getPluginContent')) {
    function getpluginContent($filename) {
        $o = file_get_contents($filename);
        $o = str_replace('<?php','',$o);
        $o = str_replace('?>','',$o);
        $o = trim($o);
        return $o;
    }
}
$plugins = array();

$plugins[1]= $modx->newObject('modplugin');
$plugins[1]->fromArray(array(
    'id' => 1,
    'name' => 'SyntaxHighlighter',
    'disabled' => 0,
    'description' => 'SyntaxHighlighter '.PKG_VERSION.'-'.PKG_RELEASE
            ." A Revolution version of Alex Gorbatchev's JS Syntax Highlighter",
    'plugincode' => getPluginContent($sources['source_core'].'/elements/plugins/syntaxhighlighter.plugin.php'),
),'',true,true);
$properties = include $sources['data'].'properties/properties.syntaxhighlighter.php';
$plugins[1]->setProperties($properties);
unset($properties);

return $plugins;
