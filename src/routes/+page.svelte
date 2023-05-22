<script lang="ts">
	import ColorScale from '$lib/components/ColorScale.svelte';
	import DateSelector from '$lib/components/DateSelector.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import InfoCard from '$lib/components/InfoCard.svelte';
	import LineChart from '$lib/components/LineChart.svelte';
	import BorderLayer from '$lib/components/Map/BorderLayer.svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import PixelLayer from '$lib/components/Map/PixelLayer.svelte';
	import Slider from '$lib/components/Slider.svelte';
	import Toggle from '$lib/components/Toggle.svelte';
	import TypeSelector from '$lib/components/TypeSelector.svelte';
	import { configs, DataType, type MapConfig } from '$lib/constants';

	export let data;

	const dateToIndex = (date: Date): number => {
		var millis = date.valueOf();
		return (millis - data.minDate.valueOf()) / 86400000;
	};	

	const getPixelData = (type: DataType): number[][] => {
		switch (type) {
			case DataType.RISK:
				return data.pixels.risk;
			case DataType.UNCERTAINTY:
				return data.pixels.iqd;
			case DataType.PROBABILITY:
				return data.pixels.prob;
		}
	};

	const getConfig = (type: DataType): MapConfig => {
		return configs[type];
	};

	let date = data.minDate;
	let dateIndex = dateToIndex(date);
	let type = DataType.RISK;
	let pixelsData = getPixelData(type);
	let chartData = data.chart;

	let distritos = true;
	let concelhos = false;
	let freguesias = false;
	let opacity = 1;

	let hValue: number | null = null;
	let hACES: string | null = null;
	let hConcelho: string | null = null;
	let hFreguesia: string | null = null;

	$: dateIndex = dateToIndex(date);
	$: pixelsData = getPixelData(type);
</script>

<div class="flex flex-col h-screen w-screen">
	<div class="grow relative">
		<Map>
			<PixelLayer
				data={pixelsData[dateIndex]}
				scale={getConfig(type).scale}
				{opacity}
				bind:hoveredValue={hValue}
			/>
			<BorderLayer
				id="freguesias"
				url={'data/freguesias.json'}
				visiblity={freguesias}
				bind:hoveredLabel={hFreguesia}
			/>
			<BorderLayer
				id="concelhos"
				url={'data/concelhos.json'}
				visiblity={concelhos}
				bind:hoveredLabel={hConcelho}
			/>
			<BorderLayer
				id="aces"
				url={'data/aces.json'}
				visiblity={distritos}
				selectable={true}
				bind:hoveredLabel={hACES}
			/>
		</Map>
		<div class="absolute z-10 top-5 left-5 flex flex-col space-y-8">
			<TypeSelector bind:value={type} />
			<Slider bind:value={opacity} />
			<div class="flex flex-col space-y-4">
				<Toggle label="ACES" bind:value={distritos} />
				<Toggle label="Concelhos" bind:value={concelhos} />
				<Toggle label="Freguesias" bind:value={freguesias} />
			</div>
			<LineChart minDate={data.minDate} maxDate={data.maxDate} {date} data={chartData} />
		</div>
		<div class="absolute z-10 bottom-5 left-0 right-0 mx-auto w-[48rem]">
			<DateSelector minDate={data.minDate} maxDate={data.maxDate} bind:date />
		</div>
		<div class="absolute z-10 bottom-5 right-5">
			<ColorScale config={getConfig(type)} />
		</div>
		<div class="absolute z-10 top-5 right-5">
			<InfoCard
				aces={hACES}
				concelho={hConcelho}
				freguesia={hFreguesia}
				value={hValue}
				isPercentage={type === DataType.PROBABILITY}
				label={getConfig(type).label}
				description={getConfig(type).description}
			/>
		</div>
	</div>
	<div class="h-24">
		<Footer />
	</div>
</div>
