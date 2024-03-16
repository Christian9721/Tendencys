export const isEmpty = (prop: any) => {
	return (
		prop === false ||
		prop === null ||
		prop === undefined ||
		(typeof prop === 'string' && prop.trim().length === 0) ||
		(Object.prototype.hasOwnProperty.call(prop, 'length') && prop.length === 0) ||
		(prop.constructor === Object && Object.keys(prop).length === 0)
	);
};
