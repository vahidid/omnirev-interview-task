export function removePercentageMark(text: string) {
	const length = text.length;
	if (length === 0) {
		return 0;
	}

	const withoutPercent =
		text.charCodeAt(length - 1) === 37 ? text.slice(0, length - 1) : text;
	const result = Number(withoutPercent);

	return Number.isNaN(result) ? 0 : result;
}
