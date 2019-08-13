export default function( obj ) {
	return function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};

};
