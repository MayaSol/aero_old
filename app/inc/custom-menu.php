<?php
function aero_nav_class( $classes, $item, $args ) {

	if ( isset($args->menu_class) ) {
		$block = explode(' ', $args->menu_class)[0];
	    array_unshift($classes, $block . '__item');
	}

    return $classes;
}
add_filter( 'nav_menu_css_class' , 'aero_nav_class' , 10, 4 );


function aero_nav_links( $atts, $item, $args ) {
    // Manipulate attributes
	$atts['class'] = $args->menu_class . '__link';

    return $atts;
}
add_filter( 'nav_menu_link_attributes', 'aero_nav_links', 10, 3 );
