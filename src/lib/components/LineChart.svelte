<script lang="ts">
	import {
		Chart as ChartJS,
		LineController,
		LineElement,
		LinearScale,
		PointElement,
		TimeScale
	} from 'chart.js';
	import 'chartjs-adapter-date-fns';
	import annotationPlugin from 'chartjs-plugin-annotation';

	let chart: ChartJS | undefined;
	export let date: Date;
	export let minDate: Date;
	export let maxDate: Date;
	export let data: number[];

	const getDates = (): number[] => {
		let dateArray: number[] = [];
		var currentDate = minDate;
		while (currentDate <= maxDate) {
			dateArray.push(currentDate.valueOf());
			currentDate = new Date(currentDate.valueOf() + 86400000);
		}
		return dateArray;
	};

	$: {
		if (chart) {
			chart!.options.plugins!.annotation!.annotations = {
				line1: {
					type: 'line' as const,
					xMin: date.valueOf(),
					xMax: date.valueOf(),
					borderColor: 'rgb(0, 0, 0)',
					borderWidth: 2
				}
			};
			chart.data.datasets.at(0)!.data = data;
		}
	}

	$: chart?.update();

	const config = {
		type: 'line' as const,
		data: {
			labels: getDates(),
			datasets: [
				{
					borderColor: 'rgb(37, 99, 235)',
					pointRadius: 0,
					pointHoverRadius: 0,
					data: data
				}
			]
		},
		options: {
			responsive: true,
			scales: {
				x: {
					type: 'time' as const,
					time: {
						displayFormats: {
							day: 'dd MMM',
							month: 'dd MMM'
						}
					},
					title: {
						display: true,
						text: 'Tempo',
						padding: 0
					}
				},
				y: {
					title: {
						display: true,
						text: 'Tx. inc. cum. 14-d (* 10^5 hab.)',
						padding: 0
					}
				}
			},
			plugins: {
				legend: {
					display: false
				},
				tooltip: {
					enabled: false
				},
				annotation: {
					annotations: {
						line1: {
							type: 'line' as const,
							xMin: date.valueOf(),
							xMax: date.valueOf(),
							borderColor: 'rgb(0, 0, 0)',
							borderWidth: 2
						}
					}
				}
			}
		}
	};

	function initialize(node: HTMLCanvasElement) {
		ChartJS.register(
			LineController,
			LineElement,
			PointElement,
			LinearScale,
			TimeScale,
			annotationPlugin
		);
		const ctx = node.getContext('2d') as CanvasRenderingContext2D;
		chart = new ChartJS(ctx, config);
		return {
			destroy() {
				chart?.destroy();
			}
		};
	}
</script>

<div class="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
	<canvas use:initialize />
</div>
