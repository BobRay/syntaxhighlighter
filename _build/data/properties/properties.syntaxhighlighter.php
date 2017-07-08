<?php

/**
 * Default properties for the SyntaxHighlighter snippet and plugin
 * @author Bob Ray <https://bobsguides.com>
 * 11/07/2011
 *
 * @package syntaxhighlighter
 * @subpackage build
 */



$properties = array(
    array(
        'name' => 'brushes',
        'desc' => 'sh_brushes_desc',
        'type' => 'textfield',
        'options' => '',
        'value' => 'JScript,Xml,Php,Css,Plain',
        'lexicon' => 'syntaxhighlighter:properties',
    ),
 );

return $properties;