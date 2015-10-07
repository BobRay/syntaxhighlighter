<?php
$settings = array();
$settings['theme'] = $modx->newObject('modSystemSetting');
$settings['theme']->fromArray(array(
	'key' => 'syntaxhighlighter.theme',
	'xtype' => 'textfield',
	'value' => 'Default',
	'namespace' => 'syntaxhighlighter',
	'area' => 'general'
	), '', true, true);

return $settings;