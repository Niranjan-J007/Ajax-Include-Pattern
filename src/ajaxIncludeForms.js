/* 
 * Plugin to ajaxInclude to work with GET and POST forms
 * 
 * Requires $.fn.serialize to properly serialize form data.
 */
(function( $, win, undefined ){
	if( typeof win.AjaxInclude !== 'undefined' ) {
		var originalMakeReq = win.AjaxInclude.makeReq;

		win.AjaxInclude.makeReq = function( url, els, isHijax ) {
			if( isHijax && els[ 0 ].tagName.toLowerCase() === 'form' ) {
				if( $.prototype.serialize ) {
					// If not post, default to get.
					var method = ( els.attr( 'method' ) || '' ).toLowerCase() === 'post' ? 'post' : 'get',
						formData = els.serialize();

					$[ method ]( url, formData, function( data ) {
						els.trigger( "ajaxIncludeResponse", [data] );
					});
				} else {
					throw new Error( '$.fn.serialize required for ajaxInclude on forms.' );
				}
			} else {
				originalMakeReq( url, els, isHijax );
			}
		};
	}
}( jQuery, this ));