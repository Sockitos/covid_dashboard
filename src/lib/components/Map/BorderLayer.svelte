<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import { key, mapboxgl, type MBMapContext } from './mapboxgl';

	const { getMap } = getContext<MBMapContext>(key);

	export let id: string;
	export let url: string;
	export let visiblity: boolean = false;
	export let selectable: boolean = false;
	export let selectedId: number | null = null;
	export let hoveredLabel: string | null = null;

	let initialized: boolean = false;
	let source: mapboxgl.AnySourceData;
	let layerId: string;
	let layer: mapboxgl.AnyLayer;
	let selectedLayerId: string;
	let selectedLayer: mapboxgl.AnyLayer;

	function onMouseClick(e: mapboxgl.EventData) {
		if (e.features.length > 0) {
			if (selectedId !== null) {
				getMap()?.setFeatureState({ source: id, id: selectedId }, { selected: false });
			}
			selectedId = e.features[0].id;
			if (selectedId !== null) {
				getMap()?.setFeatureState({ source: id, id: selectedId }, { selected: true });
			}
		}
	}

	function onMouseMove(e: mapboxgl.EventData) {
		if (e.features.length > 0) {
			hoveredLabel = e.features[0].properties.label;
		}
	}

	function onMouseLeave(e: mapboxgl.EventData) {
		hoveredLabel = null;
	}

	function initialize() {
		source = {
			type: 'geojson',
			data: url,
			generateId: true
		};

		layerId = id + 'layer';
		layer = {
			id: layerId,
			type: 'fill',
			source: id,
			paint: {
				'fill-color': 'transparent',
				'fill-outline-color': 'black'
			}
		};
		selectedLayerId = layerId + '-select';
		selectedLayer = {
			id: selectedLayerId,
			type: 'fill',
			source: id,
			paint: {
				'fill-color': 'transparent',
				'fill-outline-color': [
					'case',
					['boolean', ['feature-state', 'selected'], false],
					'blue',
					'transparent'
				]
			}
		};
		getMap()?.addSource(id, source);
		getMap()?.addLayer(layer);
		initialized = true;
	}

	$: {
		if (!initialized) {
			getMap()?.on('load', initialize);
		}
	}

	$: {
		if (initialized) {
			if (selectable) {
				getMap()?.addLayer(selectedLayer);
				getMap()?.on('click', selectedLayerId, onMouseClick);
			}
		}
	}

	$: {
		if (initialized) {
			getMap()?.setPaintProperty(
				layerId,
				'fill-outline-color',
				visiblity ? 'black' : 'transparent'
			);
			if (selectable) {
				getMap()?.setLayoutProperty(selectedLayerId, 'visibility', visiblity ? 'visible' : 'none');
			}
		}
	}

	$: {
		if (initialized) {
			getMap()?.on('mousemove', layerId, onMouseMove);
			getMap()?.on('mouseleave', layerId, onMouseLeave);
		}
	}

	onDestroy(() => {
		if (initialized) {
			getMap()?.off('load', initialize);
			getMap()?.removeLayer(layerId);
			getMap()?.removeSource(id);
			getMap()?.off('mousemove', layerId, onMouseMove);
			getMap()?.off('mouseleave', layerId, onMouseLeave);
			if (selectable) {
				getMap()?.off('click', selectedLayerId, onMouseClick);
				getMap()?.removeLayer(selectedLayerId);
			}
			initialized = false;
		}
	});
</script>
