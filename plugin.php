<?php
/**
 * Plugin Name: Paperform Form Builder - Contact Forms, Ecommerce And Product Pages, Surveys
 * Plugin URI: https://paperform.co
 * Description: Create beautiful branded online forms in Paperform and use this plugin to quickly and easily embed them on multiple WordPress pages and sites.
 * Author: Paperform
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package Paperform
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
