import type { Map } from 'mapbox-gl';
import type { FeatureCollection } from 'geojson';
import pois from './map-pois.json';
import { mapboxgl } from './mapboxgl';

const poisData: FeatureCollection = pois as FeatureCollection;

export function addPOIsToMap(map: Map): void {
    map.addSource('pois', {
        type: 'geojson',
        data: poisData
    });

    map.addLayer({
        id: 'poi-layer',
        type: 'symbol',
        source: 'pois',
        layout: {
            'icon-image': 'marker', // 'marker-15',
            'icon-size': 5, /*[
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
}
