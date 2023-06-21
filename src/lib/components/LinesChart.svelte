<script lang="ts">
	import type { ChartData } from '$lib/constants';
	import {
		Chart as ChartJS,
		LineController,
		LineElement,
		LinearScale,
		PointElement,
		TimeScale,
		Tooltip
	} from 'chart.js';
	import 'chartjs-adapter-date-fns';
	import annotationPlugin from 'chartjs-plugin-annotation';

	let chart: ChartJS | undefined;
	export let date: Date;
	export let minDate: Date;
	export let maxDate: Date;
	export let data: ChartData[] | null = null;

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
			chart.data.datasets =
				data?.map((d) => {
					return {
						animation: {
							duration: 0
						},
						borderColor: 'rgba(37, 99, 235, 0.1)',
						hoverBorderColor: 'rgb(37, 99, 235)',
						pointRadius: 0,
						pointHoverRadius: 0,
						label: d.label,
						data: d.data
					};
				}) ?? [];
		}
	}

	$: chart?.update();

	const config = {
		type: 'line' as const,
		data: {
			labels: getDates(),
			datasets:
				data?.map((d) => {
					return {
						animation: {
							duration: 0
						},
						borderColor: 'rgba(37, 99, 235, 0.1)',
						hoverBorderColor: 'rgb(37, 99, 235)',
						pointRadius: 0,
						pointHoverRadius: 0,
						label: d.label,
						data: d.data
					};
				}) ?? []
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
					position: 'nearest' as const,
					titleMarginBottom: 0,
					callbacks: {
						label: () => '',
						footer: () => ''
					}
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
			},
			interaction: {
				mode: 'dataset' as const,
				intersect: false
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
			Tooltip,
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
	{#if data}
		<canvas use:initialize />
	{:else}
		<p class="text-xl font-medium text-center text-gray-700">
			SELECIONE UM ACES PARA VER A EVOLUÇÃO DA INCIDÊNCIA NOS CONCELHOS
		</p>
	{/if}
</div>
