<script lang="ts">
    import { onMount } from 'svelte';
    import { getContext } from 'svelte';
    import { key, mapboxgl, type MBMapContext } from './Map/mapboxgl';
    
    import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
    import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

    let geocoder: any;

    const { getMap } = getContext<MBMapContext>(key);
    const map = getMap();

    onMount(() => {
      if (!map) {
        console.error('Map not found.');
        return;
      }

    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken, 
        mapboxgl: mapboxgl, 
        placeholder: 'Search for places', 
        proximity: { longitude: -74.5, latitude: 40 }, 
    });
  
    map.addControl(geocoder, 'top-left');

    return () => {
      if (geocoder) {
        map.removeControl(geocoder);
      }
    };
  });
</script>

