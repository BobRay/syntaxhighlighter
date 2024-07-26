<?php

/**
 * SyntaxHighlighter validator script - runs on installation.
 *
 * Copyright 2011-2024 Bob Ray <https://bobsguides.com>
 * @author Bob Ray <https://bobsguides.com>
 * @created 07/24/2024
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
 * Description: Validator for SyntaxHighlighter package;
 * Preserves disabled status of plugin
 * @package syntaxhighlighter
 * @subpackage build
 */

/* @var modTransportPackage $transport */
/* @var $object xPDO */
/* @var $modx modX */

if ($transport) {
 $modx =& $transport->xpdo;
} else {
 $modx =& $object->xpdo;
}

$prefix = $modx->getVersionData()['version'] >= 3
   ? 'MODX\Revolution\\'
   : '';

$success = true;

/** @var $options array */

switch($options[xPDOTransport::PACKAGE_ACTION]) {
    /* This code will execute during installation */
    case xPDOTransport::ACTION_INSTALL:
        break;

    /* This code will execute during an upgrade */
    case xPDOTransport::ACTION_UPGRADE:
        if (! isset($_SESSION['validator_run'])) {
            $modx->log(xPDO::LOG_LEVEL_INFO, 'Running PHP Validator.');
            /* @var $options array */
            $plugin = $modx->getObject($prefix . 'modPlugin', array('name' => 'SyntaxHighlighter'));

            if ($plugin) {
                $status = $plugin->get('disabled');
                $_SESSION['plugin_disabled_status'] = $status;
                $msg = $status ? 'disabled' : 'enabled';
                $modx->log(xPDO::LOG_LEVEL_INFO, 'Preserving plugin disabled status - ' . $msg);
            }
        }
        $_SESSION['validator_run'] = true;
        break;

    /* This code will execute during uninstallation */
    case xPDOTransport::ACTION_UNINSTALL:
        $success = true;
        break;

}

return $success;
