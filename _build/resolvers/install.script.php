<?php

/**
 * SyntaxHighlighter resolver script - runs on install.
 *
 * Copyright 2011-2015 Bob Ray <http://bobsguides.com>
 * @author Bob Ray <http://bobsguides.com>
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
 * Description: Resolver script for SyntaxHighlighter package
 * @package syntaxhighlighter
 * @subpackage build
 */

/* Example Resolver script */

/* The $modx object is not available here. In its place we
 * use $object->xpdo
 */

$modx =& $object->xpdo;

/* Remember that the files in the _build directory are not available
 * here and we don't know the IDs of any objects, so resources,
 * elements, and other objects must be retrieved by name with
 * $modx->getObject().
 */

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
switch($options[xPDOTransport::PACKAGE_ACTION]) {
    /* This code will execute during an install */
    case xPDOTransport::ACTION_INSTALL:

        /* Assign plugins to System events */
        if ($hasPlugins) {
            foreach($plugins as $k => $plugin) {
                $pluginObj = $modx->getObject('modPlugin',array('name'=>$plugin));
                if (! $pluginObj) $modx->log(xPDO::LOG_LEVEL_INFO,'cannot get object: ' . $plugin);
                if (empty($pluginEvents)) $modx->log(xPDO::LOG_LEVEL_INFO,'Cannot get System Events');
                if (!empty ($pluginEvents) && $pluginObj) {

                    $modx->log(xPDO::LOG_LEVEL_INFO,'Assigning Events to Plugin ' . $plugin);

                    foreach($pluginEvents as $k => $event) {
                        $intersect = $modx->newObject('modPluginEvent');
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
            $categoryObj = $modx->getObject('modCategory',array('category'=> $category));
            if (! $categoryObj) {
                $modx->log(xPDO::LOG_LEVEL_INFO,'Coult not retrieve category object: ' . $category);
            } else {
                $categoryId = $categoryObj->get('id');
            }

            $modx->log(xPDO::LOG_LEVEL_INFO,'Attempting to attach TVs to Templates');
            $ok = true;
            $templates = $modx->getCollection('modTemplate', array('category'=> $categoryId));
            if (!empty($templates)) {

                $tvs = $modx->getCollection('modTemplateVar', array('category'=> $categoryId));

                if (!empty($tvs)) {
                    foreach ($templates as $template) {
                        foreach($tvs as $tv) {
                            $tvt = $modx->newObject('modTemplateVarTemplate');
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


        /* This section connects MyPropertySet1 to MySnippet1.
         * You'll have to modify the code to meet your needs.
         *
         * Note that if you want to connect a bunch of property sets to a bunch of
         * elements, since all elements and property sets are in our category
         * we could get the category ID and then get the objects with two
         * $modx->getCollection() calls and put the code below in a double foreach loop.
         *
         * For example, to connect all our property sets to all our snippets, we'd do this:
         *
         * $category = $modx->getObject('modCategory', array('category','SyntaxHighlighter'));
         * $cId = $category->get('id');
         * $snippets = $modx->getCollection('modSnippet',array('category'=>$cId));
         * $propertySets = $modx->getCollection('modPropertySet',array('category'=>$cId));
         * foreach($snippets as $snippet) {
         *     foreach($propertySets as $propertySet {
         *         $intersect = $modx->newObject('modElementPropertySet');
         *         $intersect->set('element',$snippet->get('id'));
         *         $intersect->set('element_class','modSnippet');
         *         $intersect->set('property_set',$propertySet->get('id'));
         *         $intersect->save();
         *     }
         * }
         *
         */

         if (false) {
             $snippetName = 'MySnippet1';
             $propertySetName = 'MyPropertySet1';
             $snippet = $modx->getObject('modSnippet', array('name'=>$snippetName));
             if ($snippet) {
                 $propertySet = $modx->getObject('modPropertySet',array('name'=>$propertySetName));
                 if ($propertySet) {
                     $intersect = $modx->newObject('modElementPropertySet');
                     $intersect->set('element',$snippet->get('id'));
                     $intersect->set('element_class','modSnippet');
                     $intersect->set('property_set',$propertySet->get('id'));
                     if ($intersect->save()) {
                         $modx->log(xPDO::LOG_LEVEL_INFO,'Connected snippet ' . $snippetName .  ' to property set ' . $propertySetName);
                     } else {
                         $modx->log(xPDO::LOG_LEVEL_INFO,'Failed to connect snippet ' . $snippetName .  ' to property set ' . $propertySetName);
                     }

                 } else {
                     $modx->log(xPDO::LOG_LEVEL_INFO,'Could not retrieve property set: ' . $propertySetName);
                 }

             } else {
                     $modx->log(xPDO::LOG_LEVEL_INFO,'Could not retrieve snippet: ' . $snippetName);
             }
         }

        break;

    /* This code will execute during an upgrade */
    case xPDOTransport::ACTION_UPGRADE:

        /* put any upgrade tasks (if any) here such as removing
           obsolete files, settings, elements, resources, etc.
        */
        /* Correct System Setting value */
        $setting = $modx->getObject('modSystemSetting', array('key' => 'syntaxhighlighter.theme'));
        if ($setting) {
            if ($setting->get('value') == 'default') {
                $setting->set('value', 'Default');
                $setting->save();
            }
        }

        $success = true;
        break;

    /* This code will execute during an uninstall */
    case xPDOTransport::ACTION_UNINSTALL:
        $modx->log(xPDO::LOG_LEVEL_INFO,'Uninstalling . . .');
        $success = true;
        break;

}
$modx->log(xPDO::LOG_LEVEL_INFO,'Script resolver actions completed');
return $success;