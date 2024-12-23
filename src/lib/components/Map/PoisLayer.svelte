<script lang="ts">
    import { onMount } from 'svelte';
    import { getContext } from 'svelte';
    import { key, mapboxgl, type MBMapContext } from './mapboxgl';
    import type { FeatureCollection } from 'geojson';
    import pois from './map-pois.json';

    const poisData: FeatureCollection = pois as FeatureCollection;

    
    const { getMap } = getContext<MBMapContext>(key);
    const map = getMap()!;


    onMount(() => {
      if (!map) {
        console.error('Map not found.');
        return;
      }
    });


        map.addSource('pois', {
            type: 'geojson',
            data: poisData
        });

        map.addLayer({
            id: 'poi-layer',
            type: 'symbol',
            source: 'pois',
            layout: {
                'icon-image': 'marker',
                'icon-size': 2, /*[
                    'interpolate', ['linear'], ['zoom'],
                    6, 0.5,  
                    15, 1.5  
                ], */
                'text-field': '', 
                'text-offset': [0, 1.5],
                'text-anchor': 'top'
            }
        });

        map.moveLayer('poi-layer');
        
        map.on('mouseenter', 'poi-layer', (e) => {
            map.getCanvas().style.cursor = 'pointer';

            const feature = e.features?.[0];
            if (feature?.geometry.type === 'Point') {
                const coordinates = feature.geometry.coordinates as [number, number];
                const { title } = feature.properties || {};

                new mapboxgl.Popup({ closeButton: false, closeOnClick: false })
                    .setLngLat(coordinates)
                    .setHTML(`<h3>${title}</h3>`)
                    .addTo(map);
            }
        });

        map.on('mouseleave', 'poi-layer', () => {
            map.getCanvas().style.cursor = '';

            const popups = document.getElementsByClassName('mapboxgl-popup');
            while (popups.length) {
                popups[0].remove();
            }
        });
</script>