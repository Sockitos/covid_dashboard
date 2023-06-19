export enum DataType {
	RISK,
	UNCERTAINTY,
	PROBABILITY
}
export type ColorScaleStop = {
	value: number;
	color: string;
};

export type MapConfig = {
	label: string;
	description: string;
	stops: ColorScaleStop[];
	labels: string[];
};

export type MapConfigs = {
	[key in DataType]: MapConfig;
};

export type ChartData = {
	id: number;
	label: string;
	fids: number[];
	data: number[];
};

export const configs: MapConfigs = {
	[DataType.RISK]: {
		label: 'Risco',
		description: 'Por 100.000 habitantes',
		stops: [
			{
				value: 1000,
				color: '#aa4b0d'
			},
			{
				value: 500,
				color: '#d9a445'
			},
			{
				value: 0,
				label: '0',
				color: '#ffff80'
			}
		],
		labels: ['1000+', '750', '500', '250', '0']
	},
	[DataType.UNCERTAINTY]: {
		label: 'Incerteza',
		description: 'Por 100.000 habitantes',
		stops: [
			{
				value: 1000,
				color: '#aa4b0d'
			},
			{
				value: 500,
				color: '#d9a445'
			},
			{
				value: 0,
				label: '0',
				color: '#ffff80'
			}
		],
		labels: ['1000+', '750', '500', '250', '0']
	},
	[DataType.PROBABILITY]: {
		label: 'Probabilidade',
		description: 'Por 100.000 habitantes',
		stops: [
			{
				value: 1,
				color: '#aa4b0d'
			},
			{
				value: 0.5,
				color: '#d9a445'
			},
			{
				value: 0,
				label: '0',
				color: '#ffff80'
			}
		],
		labels: ['100%', '75%', '50%', '25%', '0%']
	}
};
