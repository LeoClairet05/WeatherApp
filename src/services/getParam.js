export function getParam(param) {
	var vars = {};
	window.location.href.replace( window.location.hash, '' ).replace(
		/[?&]+([^=&]+)=?([^&]*)?/gi,
		function( m, key, value ) {
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;
	}
	return vars;
}