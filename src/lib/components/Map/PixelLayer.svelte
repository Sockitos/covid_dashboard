<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import { key, mapboxgl, type MBMapContext } from './mapboxgl';

	const { getMap } = getContext<MBMapContext>(key);

	const sourceId = 'pixels';
	const layerId = 'pixels-layer';
	const hoverLayerId = 'pixels-hover-layer';

	export let data: number[];
	export let hoveredId: number | null = null;
	export let hoveredValue: number | null = null;
	export let opacity: number = 1;

	$: {
		if (hoveredId !== null) {
			hoveredValue = data[hoveredId];
		} else {
			hoveredValue = null;
		}
	}

	let initialized: boolean = false;
	let source: mapboxgl.AnySourceData;
	let layer: mapboxgl.AnyLayer;
	let hoverLayer: mapboxgl.AnyLayer;

	function onMouseEnter(e: mapboxgl.EventData) {
		if (e.features.length > 0) {
			if (hoveredId !== null) {
				getMap()?.setFeatureState({ source: sourceId, id: hoveredId }, { selected: false });
			}
			hoveredId = e.features[0].id;
			if (hoveredId !== null) {
				getMap()?.setFeatureState({ source: sourceId, id: hoveredId }, { selected: true });
			}
		}
	}
	function onMouseLeave() {
		if (hoveredId !== null) {
			getMap()?.setFeatureState({ source: sourceId, id: hoveredId }, { selected: false });
		}
		hoveredId = null;
	}

	function initialize() {
		source = {
			type: 'geojson',
			data: 'data/pixels.json',
			generateId: true
		};

		layer = {
			id: layerId,
			type: 'fill-extrusion',
			source: sourceId,
			paint: {
				'fill-extrusion-color': [
					'case',
					['!=', ['feature-state', 'value'], null],
					[
						'step',
						['feature-state', 'value'],
						'#ffff80',
						100,
						'#f6e871',
						200,
						'#edd162',
						300,
						'#e3bb54',
						400,
						'#d9a445',
						500,
						'#ce8e37',
						600,
						'#c27829',
						700,
						'#b6621c',
						800,
						'#aa4b0d',
						900,
						'#9d3200'
					],
					'#000'
				],
				'fill-extrusion-height': ['get', 'id'],
				'fill-extrusion-base': ['get', 'id'],
				'fill-extrusion-vertical-gradient': false,
				'fill-extrusion-translate-anchor': 'map'
			}
		};

		hoverLayer = {
			id: hoverLayerId,
			type: 'fill',
			source: sourceId,
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
		getMap()?.addSource(sourceId, source);
		getMap()?.addLayer(layer);
		getMap()?.addLayer(hoverLayer);
		getMap()?.on('mousemove', hoverLayerId, onMouseEnter);
		getMap()?.on('mouseleave', hoverLayerId, onMouseLeave);
		initialized = true;
	}

	$: {
		if (!initialized) {
			getMap()?.on('load', initialize);
		}
	}

	$: {
		if (initialized) {
			for (let i = 0; i < 22274; i++) {
				getMap()?.setFeatureState(
					{
						source: 'pixels',
						id: i
					},
					{
						value: data[i]
					}
				);
			}
		}
	}

	$: {
		if (initialized) {
			getMap()?.setPaintProperty(layerId, 'fill-extrusion-opacity', opacity);
		}
	}

	onDestroy(() => {
		getMap()?.off('load', initialize);
		getMap()?.off('mousemove', hoverLayerId, onMouseEnter);
		getMap()?.off('mouseleave', hoverLayerId, onMouseLeave);
		getMap()?.removeLayer(hoverLayerId);
		getMap()?.removeLayer(layerId);
		getMap()?.removeSource(sourceId);
		initialized = false;
	});
</script>
