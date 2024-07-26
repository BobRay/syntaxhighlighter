<?php

/**
 * SyntaxHighlighter resolver script - runs on installation.
 *
 * Copyright 2011-2024 Bob Ray <https://bobsguides.com>
 * @author Bob Ray <https://bobsguides.com>
 * @created 11/07/2011
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
 * Description: Resolver script for SyntaxHighlighter package
 * @package syntaxhighlighter
 * @subpackage build
 */

/* @var modTransportPackage $transport */
/* @var $object xPDO */

if ($transport) {
 $modx =& $transport->xpdo;
} else {
 $modx =& $object->xpdo;
}

$prefix = $modx->getVersionData()['version'] >= 3
   ? 'MODX\Revolution\\'
   : '';

/* Connecting plugins to the appropriate system events and
 * connecting TVs to their templates is done here.
 *
 * Be sure to set the name of the category in $category.
 *
 * You will have to hand-code the names of the elements and events
 * in the arrays below.
 */

$pluginEvents = array('OnLoadWebDocument');
$plugins = array('SyntaxHighlighter');

$category = 'SyntaxHighlighter';

$hasPlugins = true;

$hasTemplates = false;
$hasTemplateVariables = false;


$success = true;

$modx->log(xPDO::LOG_LEVEL_INFO,'Running PHP Resolver.');
/* @var $options array */

switch($options[xPDOTransport::PACKAGE_ACTION]) {
    /* This code will execute during installation */
    case xPDOTransport::ACTION_INSTALL:

        /* Assign plugins to System events */
        if ($hasPlugins) {
            foreach($plugins as $k => $plugin) {
                $pluginObj = $modx->getObject($prefix . 'modPlugin',array('name'=>$plugin));
                if (! $pluginObj) $modx->log(xPDO::LOG_LEVEL_INFO,'cannot get object: ' . $plugin);
                if (empty($pluginEvents)) $modx->log(xPDO::LOG_LEVEL_INFO,'Cannot get System Events');
                if (!empty ($pluginEvents) && $pluginObj) {

                    $modx->log(xPDO::LOG_LEVEL_INFO,'Assigning Events to Plugin ' . $plugin);

                    foreach($pluginEvents as $j => $event) {
                        $intersect = $modx->newObject($prefix . 'modPluginEvent');
                        $intersect->set('event',$event);
                        $intersect->set('pluginid',$pluginObj->get('id'));
                        $intersect->save();
                    }
                }
            }
        }
        /* Connect TVs to Templates. It's assumed that all TVs
         * will be connected to all package templates. If you
         * want to connect different TVs to different templates
         * you need to rewrite this.
         */

        if ($hasTemplates && $hasTemplateVariables) {
            $categoryObj = $modx->getObject($prefix . 'modCategory',array('category'=> $category));
            if (! $categoryObj) {
                $modx->log(xPDO::LOG_LEVEL_INFO,'Coult not retrieve category object: ' . $category);
            } else {
                $categoryId = $categoryObj->get('id');
            }

            $modx->log(xPDO::LOG_LEVEL_INFO,'Attempting to attach TVs to Templates');
            $ok = true;
            $templates = $modx->getCollection($prefix . 'modTemplate', array('category'=> $categoryId));
            if (!empty($templates)) {

                $tvs = $modx->getCollection($prefix . 'modTemplateVar', array('category'=> $categoryId));

                if (!empty($tvs)) {
                    foreach ($templates as $template) {
                        foreach($tvs as $tv) {
                            $tvt = $modx->newObject($prefix . 'modTemplateVarTemplate');
                            if ($tvt) {
                                $r1 = $tvt->set('templateid', $template->get('id'));
                                $r2 = $tvt->set('tmplvarid', $tv->get('id'));
                                if ($r1 && $r2) {
                                    $tvt->save();
                                } else {
                                    $ok = false;
                                    $modx->log(xPDO::LOG_LEVEL_INFO,'Could not set TemplateVarTemplate fields');
                                }
                            } else {
                                $ok = false;
                                $modx->log(xPDO::LOG_LEVEL_INFO,'Could not create TemplateVarTemplate');
                            }
                        }
                    }
                } else {
                    $ok = false;
                    $modx->log(xPDO::LOG_LEVEL_INFO,'Could not retrieve TVs in category: ' . $category);
                }

            } else {
                $ok = false;
                $modx->log(xPDO::LOG_LEVEL_INFO,'Could not retrieve Templates in category: ' . $category);
            }

            if ($ok) {
                $modx->log(xPDO::LOG_LEVEL_INFO,'TVs attached to Templates successfully');
            } else {
                $modx->log(xPDO::LOG_LEVEL_INFO,'Failed to attach TVs to Templates');
            }
        }
        break;

    /* This code will execute during an upgrade */
    case xPDOTransport::ACTION_UPGRADE:

        /* put any upgrade tasks (if any) here such as removing
           obsolete files, settings, elements, resources, etc.
        */
        /* Correct System Setting value */
        $setting = $modx->getObject($prefix . 'modSystemSetting', array('key' => 'syntaxhighlighter.theme'));
        if ($setting) {
            if ($setting->get('value') == 'default') {
                $setting->set('value', 'Default');
                $setting->save();
            }
        }
        $statusKnown = false;
        if (isset($_SESSION['plugin_disabled_status'])) {
            $status = $_SESSION['plugin_disabled_status'];
            $statusKnown = true;
            $msg = $status ? 'disabled' : 'enabled';

            $modx->log(xPDO::LOG_LEVEL_INFO, 'Attempting to restore plugin disabled status: ' . $msg);
        } else {
            $modx->log(xPDO::LOG_LEVEL_INFO, 'Could not get plugin disabled status from session variable -- Check plugin disabled status manually');
        }

        if ($statusKnown && isset($status)) {
            $plugin = $modx->getObject($prefix . 'modPlugin', array('name' => 'SyntaxHighlighter'));


            if ($plugin) {
                $plugin->set('disabled', $status);
                $msg = $status ? 'disabled' : 'enabled';
                if ($plugin->save()) {
                    $modx->log(xPDO::LOG_LEVEL_INFO, 'Restored plugin disabled status - ' . $msg);
                } else {
                    $modx->log(xPDO::LOG_LEVEL_INFO, 'Failed to save plugin -- check disabled status manually');
                }

            } else {
                $modx->log(xPDO::LOG_LEVEL_INFO, 'Could not find plugin -- check disabled status manually');
            }
        }
        $success = true;
        unset($_SESSION['plugin_disabled_status']);
        unset($_SESSION['validator_run']);
        break;

    /* This code will execute during uninstallation */
    case xPDOTransport::ACTION_UNINSTALL:
        $modx->log(xPDO::LOG_LEVEL_INFO,'Uninstalling . . .');
        $success = true;
        break;

}
$modx->log(xPDO::LOG_LEVEL_INFO,'Script resolver actions completed');
return $success;
