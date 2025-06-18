const rtf = new Intl.RelativeTimeFormat("fr", { numeric: "auto" });

export function getRelativeTime(dateStr: string): string {
	const date = new Date(dateStr);
	const diff = Date.now() - date.getTime();
	const seconds = Math.floor(diff / 1000);

	const ranges = {
		year: 3600 * 24 * 365,
		month: 3600 * 24 * 30,
		week: 3600 * 24 * 7,
		day: 3600 * 24,
		hour: 3600,
		minute: 60,
		second: 1,
	};

	for (const [unit, secondsInUnit] of Object.entries(ranges)) {
		const delta = Math.floor(seconds / secondsInUnit);
		if (Math.abs(delta) >= 1) {
			return rtf.format(-delta, unit as Intl.RelativeTimeFormatUnit);
		}
	}
	return rtf.format(0, "second");
}
