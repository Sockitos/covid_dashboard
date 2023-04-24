
import type { PageLoadEvent } from './$types';

/** @type {import('./$types').PageLoad} */
export async function load(e: PageLoadEvent) {
    return {
        iqd: {
            chart: (await (await e.fetch('/data/iqd_chart.json')).json()).iqd as number[],
            pixels: (await (await e.fetch('/data/iqd.json')).json()).iqd as number[][]
        },
        risk: {
            chart: (await (await e.fetch('/data/risk_chart.json')).json()).risk as number[],
            pixels: (await (await e.fetch('/data/risk.json')).json()).risk as number[][]
        }
    };
}