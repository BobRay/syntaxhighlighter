<?php
/* Define the MODX path constants necessary for connecting to your core and other directories.
 *
 * If you have not moved the core, the current values should work.
 * 
 * In some cases, you may have to hard-code the full paths */

define('MODX_CORE_PATH', dirname(dirname(dirname(dirname(dirname(__FILE__))))) . '/core/');
define('MODX_BASE_PATH', dirname(dirname(dirname(dirname(dirname(__FILE__))))) . '/');
define('MODX_MANAGER_PATH', MODX_BASE_PATH . 'manager/');
define('MODX_CONNECTORS_PATH', MODX_BASE_PATH . 'connectors/');
define('MODX_ASSETS_PATH', MODX_BASE_PATH . 'assets/');
/* prevent error messages in build */
define('MODX_BASE_URL', '/');
define('MODX_MANAGER_URL', '/manager');
define('MODX_ASSETS_URL', MODX_BASE_PATH . 'assets/');
define('MODX_CONNECTORS_URL', MODX_BASE_PATH . 'connectors/');

?>