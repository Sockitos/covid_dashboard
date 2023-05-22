
import type { PageLoadEvent } from './$types';

/** @type {import('./$types').PageLoad} */
export async function load(e: PageLoadEvent) {
    const defaultMinDate = new Date(2020, 8, 1);
    const defaultMaxDate = new Date(2021, 4, 25);

    let minDate = defaultMinDate;
    let maxDate = defaultMaxDate;

    const dateToIndex = (date: Date): number => {
		var millis = date.valueOf();
		return (millis - defaultMinDate.valueOf()) / 86400000;
	};

    const params = e.url.searchParams;
    const paramsMinDate = params.has('minDate') ? new Date(params.get('minDate')!) : null;
    const paramsMaxDate = params.has('maxDate') ? new Date(params.get('maxDate')!) : null;

    if (paramsMinDate && paramsMaxDate && paramsMinDate.valueOf() < paramsMaxDate.valueOf()) {
        minDate = paramsMinDate && paramsMinDate.valueOf() > minDate.valueOf() ? paramsMinDate : minDate;
        maxDate = paramsMaxDate && paramsMaxDate.valueOf() < maxDate.valueOf() ? paramsMaxDate : maxDate;
    }   

    const minIndex = dateToIndex(minDate);
    const maxIndex = dateToIndex(maxDate);

    e.url.searchParams.set('minDate', minDate.toISOString().slice(0, 10));
    e.url.searchParams.set('maxDate', maxDate.toISOString().slice(0, 10));
    
    return {
        minDate: minDate,
        maxDate: maxDate,
        chart: ((await (await e.fetch('/data/chart.json')).json()).risk as number[]).slice(minIndex, maxIndex + 1),
        pixels: {
            iqd: ((await (await e.fetch('/data/iqd.json')).json()).iqd as number[][]).slice(minIndex, maxIndex + 1),
            risk: ((await (await e.fetch('/data/risk.json')).json()).risk as number[][]).slice(minIndex, maxIndex + 1),
            prob: ((await (await e.fetch('/data/prob.json')).json()).prob as number[][]).slice(minIndex, maxIndex + 1)
        }
    };
}