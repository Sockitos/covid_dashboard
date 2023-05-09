
import type { PageLoadEvent } from './$types';

/** @type {import('./$types').PageLoad} */
export async function load(e: PageLoadEvent) {
    return {
        minDate: new Date(2020, 8, 1),
        maxDate: new Date(2021, 4, 25),
        iqd: {
            chart: (await (await e.fetch('/data/iqd_chart.json')).json()).iqd as number[],
            pixels: (await (await e.fetch('/data/iqd.json')).json()).iqd as number[][]
        },
        risk: {
            chart: (await (await e.fetch('/data/risk_chart.json')).json()).risk as number[],
            pixels: (await (await e.fetch('/data/risk.json')).json()).risk as number[][]
        },
        prob: {
            chart: (await (await e.fetch('/data/prob_chart.json')).json()).prob as number[],
            pixels: (await (await e.fetch('/data/prob.json')).json()).prob as number[][]
        }
    };
}