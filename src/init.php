<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function paperform_block_assets() { // phpcs:ignore
	// Register block styles for both frontend + backend.
	wp_register_style(
		'paperform_block-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		is_admin() ? array( 'wp-editor' ) : null, // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	);

	// Register block editor script for backend.
	wp_register_script(
		'paperform_block-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
		null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

	// Register block editor styles for backend.
	wp_register_style(
		'paperform_block-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
	);

	// WP Localized globals. Use dynamic PHP stuff in JavaScript via `cgbGlobal` object.
	wp_localize_script(
		'paperform_block-block-js',
		'cgbGlobal', // Array containing dynamic data for a JS Global.
		[
			'pluginDirPath' => plugin_dir_path( __DIR__ ),
			'pluginDirUrl'  => plugin_dir_url( __DIR__ ),
			// Add more data here that you want to access from `cgbGlobal` object.
		]
	);

	/**
	 * Register Gutenberg block on server-side.
	 *
	 * Register the block on server-side to ensure that the block
	 * scripts and styles for both frontend and backend are
	 * enqueued when the editor loads.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
	 * @since 1.16.0
	 */
	register_block_type(
		'paperform/form', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'paperform_block-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'paperform_block-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'paperform_block-block-editor-css',
		)
	);
}

function redirect_to_paperform() {
	echo '<div style="padding: 2rem;">
		<h1>Paperform</h1>
		<p>The Paperform Wordpress Plugin makes it simple to embed Paperform forms in any post in the Gutenberg editor.</p>
		<a class="button" href="https://paperform.co/" target="_blank">Go to Paperform</a>
		<a class="button" href="https://paperform.co/help" target="_blank">Read the docs</a>
	</div>';
}

function add_paperform_menu() {
	add_menu_page('Paperform', 'Paperform', 'manage_options', 'paperform',  'redirect_to_paperform', "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNjM5cHgiIGhlaWdodD0iNjM5cHgiIHZpZXdCb3g9IjAgMCA2MzkgNjM5IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPHRpdGxlPkFydGJvYXJkPC90aXRsZT4KICAgIDxnIGlkPSJBcnRib2FyZCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IkxvZ28tLXNvbGlkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNjAuMDAwMDAwLCA1NC4wMDAwMDApIiBmaWxsPSIjNDg5QUMyIiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8cGF0aCBkPSJNMjguMTA1NzI2OSwxLjMyOTA0OTc5IEw2My4yMzc4ODU1LDEuMzI5MDQ5NzkgQzc4Ljc2MDI0OTgsMS4zMjkwNDk3OSA5MS4zNDM2MTIzLDEzLjkwOTUxNDYgOTEuMzQzNjEyMywyOS40MjgzMDQ0IEw5MS4zNDM2MTIzLDUwMi45MDA3NDUgQzkxLjM0MzYxMjMsNTE4LjQxOTUzNSA3OC43NjAyNDk4LDUzMSA2My4yMzc4ODU1LDUzMSBMMjguMTA1NzI2OSw1MzEgQzEyLjU4MzM2MjUsNTMxIDAsNTE4LjQxOTUzNSAwLDUwMi45MDA3NDUgTDAsMjkuNDI4MzA0NCBDMCwxMy45MDk1MTQ2IDEyLjU4MzM2MjUsMS4zMjkwNDk3OSAyOC4xMDU3MjY5LDEuMzI5MDQ5NzkgWiBNMTY4LjMzODQ0LDQuMTkxOTM2NzMgTDMwNC42NTEyMTYsODUuODA2NjE5NSBDMzEzLjU1MjAzOCw5MS4xMzU4MTczIDMxOSwxMDAuNzQ2NDEyIDMxOSwxMTEuMTE4ODk5IEwzMTksMjE2LjM4NTkxNyBDMzE5LDIyNi43NzEyNjUgMzEzLjUzODYyNiwyMzYuMzkxODA0IDMwNC42MjAyNSwyNDEuNzE2NzEyIEwxNjguMzA3NDc1LDMyMy4xMDUxNzkgQzE1NC4zMTQ0NCwzMzEuNDYwMDIgMTM2LjE5NjM0NywzMjYuODkxOTc0IDEyNy44Mzk1ODIsMzEyLjkwMjE2MyBDMTI1LjEwNzY4NywzMDguMzI4Nzc3IDEyMy42NjUxOTgsMzAzLjEwMTI2NSAxMjMuNjY1MTk4LDI5Ny43NzQzODQgTDEyMy42NjUxOTgsMjkuNTA0MjE3NCBDMTIzLjY2NTE5OCwxMy4yMDk0ODc3IDEzNi44Nzc3MjksMCAxNTMuMTc2MjExLDAgQzE1OC41MTY1NjgsMCAxNjMuNzU2ODM5LDEuNDQ4NzkwNTUgMTY4LjMzODQ0LDQuMTkxOTM2NzMgWiIgaWQ9IlNoYXBlIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=");
}

function paperform_shortcode($attributes = []) {
	if (!isset($attributes['id']) && isset($attributes[0])) {
		$attributes['id'] = $attributes[0];
	}	
	if (!isset($attributes['id'])) {
		return '';
	}
	wp_enqueue_script('paperform_embed', 'https://paperform.co/__embed.min.js');
	
    $attributes['paperform-id'] = $attributes['id'];

	$buttonText = isset($attributes['label']) ? $attributes['label'] : "Open Form";
	unset($attributes['label']);
	unset($attributes['id']);
    $attrsString = "";
	
	foreach($attributes as $key => $value) {
		$attrsString .= " $key='$value'";
	}

	if (isset($attributes['popup-button'])) {
		return "<button $attrsString>$buttonText</button>";
	}
	return "<div $attrsString></div>";
}

// Hook: Block assets.
add_action( 'init', 'paperform_block_assets' );
add_action('admin_menu', 'add_paperform_menu');
add_shortcode('paperform', 'paperform_shortcode');