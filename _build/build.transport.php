<?php
/**
 * SyntaxHighlighter Build Script
 *
 * Copyright 2011 Bob Ray <http://bobsguides.com>
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
 * @subpackage build
 */
/**
 * Build SyntaxHighlighter Package
 *
 * Description: Build script for SyntaxHighlighter package
 * @package syntaxhighlighter
 * @subpackage build
 */

/* See the syntaxhighlighter/core/docs/tutorial.html file for
 * more detailed information about using the package
 */

/* Set package info be sure to set all of these */
define('PKG_NAME','SyntaxHighlighter');
define('PKG_NAME_LOWER','syntaxhighlighter');
define('PKG_VERSION','1.0.1');
define('PKG_RELEASE','pl');
define('PKG_CATEGORY','SyntaxHighlighter');

/* Set package options - you can turn these on one-by-one
 * as you create the transport package
 * */
$hasAssets = true; /* Transfer the files in the assets dir. */
$hasCore = true;   /* Transfer the files in the core dir. */
$hasSnippets = true;
$hasChunks = false;
$hasTemplates = false;
$hasResources = false;
$hasValidator = false; /* Run a validator before installing anything */
$hasResolver = true; /* Run a resolver after installing everything */
$hasSetupOptions = false; /* HTML/PHP script to interact with user */
$hasMenu = false; /* Add items to the MODx Top Menu */
$hasSettings = false; /* Add new MODx System Settings */

/* Note: TVs are connected to their templates in the script resolver
 * (see _build/data/resolvers/install.script.php)
 */
$hasTemplateVariables = false;
$hasTemplates = false;
/* Note: plugin events are connected to their plugins in the script
 * resolver (see _build/data/resolvers/install.script.php)
 */
$hasPlugins = true;

$hasPropertySets = false;
/* Note: property sets are connected to elements in the script
 * resolver (see _build/data/resolvers/install.script.php)
 */
$hasSubPackages = false;

/******************************************
 * Work begins here
 * ****************************************/

/* set start time */
$mtime = microtime();
$mtime = explode(" ", $mtime);
$mtime = $mtime[1] + $mtime[0];
$tstart = $mtime;
set_time_limit(0);

/* define sources */
$root = dirname(dirname(__FILE__)) . '/';
$sources= array (
    'root' => $root,
    'build' => $root . '_build/',
    /* note that the next two must not have a trailing slash */
    'source_core' => $root.'core/components/'.PKG_NAME_LOWER,
    'source_assets' => $root.'assets/components/'.PKG_NAME_LOWER,
    'resolvers' => $root . '_build/resolvers/',
    'validators'=> $root . '_build/validators/',
    'data' => $root . '_build/data/',
    'docs' => $root . 'core/components/' . PKG_NAME_LOWER . '/docs/',
    'install_options' => $root . '_build/install.options/',
    'packages'=> $root . 'core/packages',
);
unset($root);

/* Instantiate MODx -- if this require fails, check your
 * _build/build.config.php file
 */
require_once $sources['build'].'build.config.php';
require_once MODX_CORE_PATH . 'model/modx/modx.class.php';
$modx= new modX();
$modx->initialize('mgr');
$modx->setLogLevel(xPDO::LOG_LEVEL_INFO);
$modx->setLogTarget(XPDO_CLI_MODE ? 'ECHO' : 'HTML');

/* load builder */
$modx->loadClass('transport.modPackageBuilder','',false, true);
$builder = new modPackageBuilder($modx);
$builder->createPackage(PKG_NAME_LOWER, PKG_VERSION, PKG_RELEASE);
$builder->registerNamespace(PKG_NAME_LOWER,false,true,'{core_path}components/'.PKG_NAME_LOWER.'/');


/* create category  The category is required and will automatically
 * have the name of your package
 */

$category= $modx->newObject('modCategory');
$category->set('id',1);
$category->set('category',PKG_CATEGORY);

/* add snippets */
if ($hasSnippets) {
    $modx->log(modX::LOG_LEVEL_INFO,'Adding in snippets.');
    $snippets = include $sources['data'].'transport.snippets.php';
    /* note: Snippets' default properties are set in transport.snippets.php */
    if (is_array($snippets)) {
        $category->addMany($snippets, 'Snippets');
    } else { $modx->log(modX::LOG_LEVEL_FATAL,'Adding snippets failed.'); }
}

if ($hasPropertySets) { /* add property sets */
    $modx->log(modX::LOG_LEVEL_INFO,'Adding in property sets.');
    $propertysets = include $sources['data'].'transport.propertysets.php';
    /* note: property set' properties are set in transport.propertysets.php */
    if (is_array($snippets)) {
        $category->addMany($propertysets, 'PropertySets');
    } else { $modx->log(modX::LOG_LEVEL_FATAL,'Adding property sets failed.'); }
}
if ($hasChunks) { /* add chunks  */
    $modx->log(modX::LOG_LEVEL_INFO,'Adding in chunks.');
    /* note: Chunks' default properties are set in transport.chunks.php */    
    $chunks = include $sources['data'].'transport.chunks.php';
    if (is_array($chunks)) {
        $category->addMany($chunks, 'Chunks');
    } else { $modx->log(modX::LOG_LEVEL_FATAL,'Adding chunks failed.'); }
}

if ($hasPlugins) {
    $modx->log(modX::LOG_LEVEL_INFO,'Adding in Plugins.');
    $plugins = include $sources['data'] . 'transport.plugins.php';
     if (is_array($plugins)) {
        $category->addMany($plugins);
     }
}

/* Create Category attributes array dynamically
 * based on which elements are present
 */

$attr = array(xPDOTransport::UNIQUE_KEY => 'category',
    xPDOTransport::PRESERVE_KEYS => false,
    xPDOTransport::UPDATE_OBJECT => true,
    xPDOTransport::RELATED_OBJECTS => true,
);


if ($hasSnippets) {
    $attr[xPDOTransport::RELATED_OBJECT_ATTRIBUTES]['Snippets'] = array(
            xPDOTransport::PRESERVE_KEYS => false,
            xPDOTransport::UPDATE_OBJECT => true,
            xPDOTransport::UNIQUE_KEY => 'name',
        );
}

if ($hasPropertySets) {
    $attr[xPDOTransport::RELATED_OBJECT_ATTRIBUTES]['PropertySets'] = array(
            xPDOTransport::PRESERVE_KEYS => false,
            xPDOTransport::UPDATE_OBJECT => true,
            xPDOTransport::UNIQUE_KEY => 'name',
        );
}

if ($hasChunks) {
    $attr[xPDOTransport::RELATED_OBJECT_ATTRIBUTES]['Chunks'] = array(
            xPDOTransport::PRESERVE_KEYS => false,
            xPDOTransport::UPDATE_OBJECT => true,
            xPDOTransport::UNIQUE_KEY => 'name',
        );
}

if ($hasPlugins) {
    $attr[xPDOTransport::RELATED_OBJECT_ATTRIBUTES]['Plugins'] = array(
        xPDOTransport::PRESERVE_KEYS => false,
        xPDOTransport::UPDATE_OBJECT => true,
        xPDOTransport::UNIQUE_KEY => 'name',
    );
}

/* create a vehicle for the category and all the things
 * we've added to it.
 */
$vehicle = $builder->createVehicle($category,$attr);

/* package in script resolver if any */
if ($hasResolver) {
    $modx->log(modX::LOG_LEVEL_INFO,'Adding in Script Resolver.');
    $vehicle->resolve('php',array(
        'source' => $sources['resolvers'] . 'install.script.php',
    ));
}
/* This section transfers every file in the local
 syntaxhighlighters/syntaxhighlighter/assets directory to the
 target site's assets/syntaxhighlighter directory on install.
 If the assets dir. has been renamed or moved, they will still
 go to the right place.
 */

if ($hasCore) {
    $vehicle->resolve('file',array(
            'source' => $sources['source_core'],
            'target' => "return MODX_CORE_PATH . 'components/';",
        ));
}

/* This section transfers every file in the local 
 syntaxhighlighters/syntaxhighlighter/core directory to the
 target site's core/syntaxhighlighter directory on install.
 If the core has been renamed or moved, they will still
 go to the right place.
 */

    if ($hasAssets) {
        $vehicle->resolve('file',array(
            'source' => $sources['source_assets'],
            'target' => "return MODX_ASSETS_PATH . 'components/';",
        ));
    }


/* Put the category vehicle (with all the stuff we added to the
 * category) into the package 
 */
$builder->putVehicle($vehicle);

/* Next-to-last step - pack in the license file, readme.txt, changelog,
 * and setup options 
 */
$builder->setPackageAttributes(array(
    'license' => file_get_contents($sources['docs'] . 'license.txt'),
    'readme' => file_get_contents($sources['docs'] . 'readme.txt'),
    'changelog' => file_get_contents($sources['docs'] . 'changelog.txt'),
   /* 'setup-options' => array(
        'source' => $sources['install_options'].'user.input.php',
    ), */
));

/* Finally, transport the settings
 */
$settings = include_once $sources['data'].'transport.settings.php';
$attributes= array(
	xPDOTransport::UNIQUE_KEY => 'key',
	xPDOTransport::PRESERVE_KEYS => true,
	xPDOTransport::UPDATE_OBJECT => false,
	);
if (!is_array($settings)) { $modx->log(modX::LOG_LEVEL_FATAL,'Adding settings failed.'); }
foreach ($settings as $setting) {
	$vehicle = $builder->createVehicle($setting,$attributes);
	$builder->putVehicle($vehicle);
}
$modx->log(modX::LOG_LEVEL_INFO,'Packaged in '.count($settings).' system settings.'); flush();
unset($settings,$setting,$attributes);

/* Last step - zip up the package */
$builder->pack();

/* report how long it took */
$mtime= microtime();
$mtime= explode(" ", $mtime);
$mtime= $mtime[1] + $mtime[0];
$tend= $mtime;
$totalTime= ($tend - $tstart);
$totalTime= sprintf("%2.4f s", $totalTime);

$modx->log(xPDO::LOG_LEVEL_INFO, "Package Built.");
$modx->log(xPDO::LOG_LEVEL_INFO, "Execution time: {$totalTime}");
exit();
