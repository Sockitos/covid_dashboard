import { DataType, type ChartData } from '$lib/constants';
import type { PageLoadEvent } from './$types';

/** @type {import('./$types').PageLoad} */
export async function load(e: PageLoadEvent) {
	const defaultMinDate = new Date('2020-05-15');
	const defaultMaxDate = new Date('2021-05-25');

	let minDate = defaultMinDate;
	let maxDate = defaultMaxDate;

	const dateToIndex = (date: Date): number => {
		const millis = date.valueOf();
		return (millis - defaultMinDate.valueOf()) / 86400000;
	};

	const params = e.url.searchParams;
	const paramsMinDate = params.has('minDate') ? new Date(params.get('minDate')!) : null;
	const paramsMaxDate = params.has('maxDate') ? new Date(params.get('maxDate')!) : null;
	const paramsIsTrad = params.has('trad') ? params.get('trad') === 'true' : false;

	if (paramsMinDate && paramsMaxDate && paramsMinDate.valueOf() < paramsMaxDate.valueOf()) {
		minDate =
			paramsMinDate && paramsMinDate.valueOf() > minDate.valueOf() ? paramsMinDate : minDate;
		maxDate =
			paramsMaxDate && paramsMaxDate.valueOf() < maxDate.valueOf() ? paramsMaxDate : maxDate;
	}

	const minIndex = dateToIndex(minDate);
	const maxIndex = dateToIndex(maxDate);

	e.url.searchParams.set('minDate', minDate.toISOString().slice(0, 10));
	e.url.searchParams.set('maxDate', maxDate.toISOString().slice(0, 10));

	const chart = (await (await e.fetch('data/chart.json')).json()).data as number[];
	const chart2 = (await (await e.fetch('data/chart2.json')).json()).data as ChartData[];
	const inc = (await (await e.fetch('data/inc.json')).json()).data as [number, number, number][][];
	const iqd = (await (await e.fetch('data/iqd.json')).json()).data as number[][];
	const prob = (await (await e.fetch('data/prob.json')).json()).data as number[][];
	const incTrad = (await (await e.fetch('data/inc_trad.json')).json()).data as number[][];

	return {
		minDate: minDate,
		maxDate: maxDate,
		chart: chart.slice(minIndex, maxIndex + 1),
		chart2: chart2.map((d) => ({
			...d,
			data: d.data.slice(minIndex, maxIndex + 1)
		})),
		pixels: {
			[DataType.INCIDENCE]: inc.slice(minIndex, maxIndex + 1),
			[DataType.UNCERTAINTY]: iqd.slice(minIndex, maxIndex + 1),
			[DataType.PROBABILITY]: prob.slice(minIndex, maxIndex + 1)
		},
		trad: {
			[DataType.INCIDENCE]: incTrad.slice(minIndex, maxIndex + 1),
			[DataType.UNCERTAINTY]: [],
			[DataType.PROBABILITY]: []
		},
		isTrad: paramsIsTrad
	};
}
