<?php
/**
 * SyntaxHighlighter transport templates
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
 * Description: Array of template objects for SyntaxHighlighter package
 * @package syntaxhighlighter
 * @subpackage build
 */

$templates = array();

$templates[1]= $modx->newObject('modTemplate');
$templates[1]->fromArray(array(
    'id' => 1,
    'templatename' => 'myTemplate1',
    'description' => 'Template One for SyntaxHighlighter package',
    'content' => file_get_contents($sources['source_core'].'/elements/templates/mytemplate1.tpl'),
    'properties' => '',
),'',true,true);

$templates[2]= $modx->newObject('modTemplate');
$templates[2]->fromArray(array(
    'id' => 2,
    'templatename' => 'myTemplate2',
    'description' => 'Template Two for SyntaxHighlighter Package',
    'content' => file_get_contents($sources['source_core'].'/elements/templates/mytemplate2.tpl'),
    'properties' => '',
),'',true,true);

return $templates;
