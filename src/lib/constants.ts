
export enum DataType {
    RISK,
    UNCERTAINTY,
    PROBABILITY
}
export type ColorScaleInterval = {
    upperBound: number;
    lowerBound: number;
    label: string;
    color: string;
}

export type ColorScaleConfig = {
    label: string;
    description: string;
    intervals: ColorScaleInterval[];
}



export type MapConfig = {
    type: DataType;
    scale: ColorScaleConfig;
}

export const configs: MapConfig[] = [
    {
        type: DataType.RISK, scale: {
            label: 'Risco', description: 'Por 100.000 habitantes', intervals: [{
                upperBound: Number.MAX_SAFE_INTEGER,
                lowerBound: 900,
                label: '900+',
                color: '#9d3200',
            },
            {
                upperBound: 900,
                lowerBound: 800,
                label: '800 - 900',
                color: '#aa4b0d',
            },
            {
                upperBound: 800,
                lowerBound: 700,
                label: '700 - 800',
                color: '#b6621c',
            },
            {
                upperBound: 700,
                lowerBound: 600,
                label: '600 - 700',
                color: '#c27829',
            },
            {
                upperBound: 600,
                lowerBound: 500,
                label: '500 - 600',
                color: '#ce8e37',
            },
            {
                upperBound: 500,
                lowerBound: 400,
                label: '400 - 500',
                color: '#d9a445',
            },
            {
                upperBound: 400,
                lowerBound: 300,
                label: '300 - 400',
                color: '#e3bb54',
            },
            {
                upperBound: 300,
                lowerBound: 200,
                label: '200 - 300',
                color: '#edd162',
            },
            {
                upperBound: 200,
                lowerBound: 100,
                label: '100 - 200',
                color: '#f6e871',
            },
            {
                upperBound: 100,
                lowerBound: 0,
                label: '0 - 100',
                color: '#ffff80',
            },],
        },
    },
    {
        type: DataType.UNCERTAINTY, scale: {
            label: 'Incerteza', description: 'Por 100.000 habitantes', intervals: [{
                upperBound: Number.MAX_SAFE_INTEGER,
                lowerBound: 900,
                label: '900+',
                color: '#9d3200',
            },
            {
                upperBound: 900,
                lowerBound: 800,
                label: '800 - 900',
                color: '#aa4b0d',
            },
            {
                upperBound: 800,
                lowerBound: 700,
                label: '700 - 800',
                color: '#b6621c',
            },
            {
                upperBound: 700,
                lowerBound: 600,
                label: '600 - 700',
                color: '#c27829',
            },
            {
                upperBound: 600,
                lowerBound: 500,
                label: '500 - 600',
                color: '#ce8e37',
            },
            {
                upperBound: 500,
                lowerBound: 400,
                label: '400 - 500',
                color: '#d9a445',
            },
            {
                upperBound: 400,
                lowerBound: 300,
                label: '300 - 400',
                color: '#e3bb54',
            },
            {
                upperBound: 300,
                lowerBound: 200,
                label: '200 - 300',
                color: '#edd162',
            },
            {
                upperBound: 200,
                lowerBound: 100,
                label: '100 - 200',
                color: '#f6e871',
            },
            {
                upperBound: 100,
                lowerBound: 0,
                label: '0 - 100',
                color: '#ffff80',
            },],
        },
    }, {
        type: DataType.PROBABILITY, scale: {
            label: 'Probabilidade', description: 'Por 100.000 habitantes', intervals: [{
                upperBound: Number.MAX_SAFE_INTEGER,
                lowerBound: 900,
                label: '900+',
                color: '#9d3200',
            },
            {
                upperBound: 900,
                lowerBound: 800,
                label: '800 - 900',
                color: '#aa4b0d',
            },
            {
                upperBound: 800,
                lowerBound: 700,
                label: '700 - 800',
                color: '#b6621c',
            },
            {
                upperBound: 700,
                lowerBound: 600,
                label: '600 - 700',
                color: '#c27829',
            },
            {
                upperBound: 600,
                lowerBound: 500,
                label: '500 - 600',
                color: '#ce8e37',
            },
            {
                upperBound: 500,
                lowerBound: 400,
                label: '400 - 500',
                color: '#d9a445',
            },
            {
                upperBound: 400,
                lowerBound: 300,
                label: '300 - 400',
                color: '#e3bb54',
            },
            {
                upperBound: 300,
                lowerBound: 200,
                label: '200 - 300',
                color: '#edd162',
            },
            {
                upperBound: 200,
                lowerBound: 100,
                label: '100 - 200',
                color: '#f6e871',
            },
            {
                upperBound: 100,
                lowerBound: 0,
                label: '0 - 100',
                color: '#ffff80',
            },],
        },
    },
];