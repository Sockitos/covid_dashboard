
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

export type MapConfig = {
    label: string;
    description: string;
    scale: ColorScaleInterval[];
}

export type MapConfigs = {
    [key in DataType]: MapConfig;
}

export const configs: MapConfigs = {
    [DataType.RISK]: {
        label: 'Risco',
        description: 'Por 100.000 habitantes',
        scale: [
            {
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
            },
        ],
    },
    [DataType.UNCERTAINTY]: {
        label: 'Incerteza',
        description: 'Por 100.000 habitantes',
        scale: [
            {
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
            },
        ],
    },
    [DataType.PROBABILITY]: {
        label: 'Probabilidade',
        description: 'Por 100.000 habitantes',
        scale: [
            {
                upperBound: 1,
                lowerBound: 0.9,
                label: '90% - 100%',
                color: '#9d3200',
            },
            {
                upperBound: 0.9,
                lowerBound: 0.8,
                label: '80% - 90%',
                color: '#aa4b0d',
            },
            {
                upperBound: 0.8,
                lowerBound: 0.7,
                label: '70% - 80%',
                color: '#b6621c',
            },
            {
                upperBound: 0.7,
                lowerBound: 0.6,
                label: '60% - 70%',
                color: '#c27829',
            },
            {
                upperBound: 0.6,
                lowerBound: 0.5,
                label: '50% - 60%',
                color: '#ce8e37',
            },
            {
                upperBound: 0.5,
                lowerBound: 0.4,
                label: '40% - 50%',
                color: '#d9a445',
            },
            {
                upperBound: 0.4,
                lowerBound: 0.3,
                label: '30% - 40%',
                color: '#e3bb54',
            },
            {
                upperBound: 0.3,
                lowerBound: 0.2,
                label: '20% - 30%',
                color: '#edd162',
            },
            {
                upperBound: 0.2,
                lowerBound: 0.1,
                label: '10% - 20%',
                color: '#f6e871',
            },
            {
                upperBound: 0.1,
                lowerBound: 0,
                label: '0% - 10%',
                color: '#ffff80',
            },
        ],
    },
}