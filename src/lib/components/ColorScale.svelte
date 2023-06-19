<script lang="ts">
	import type { MapConfig } from '$lib/constants';
	export let config: MapConfig;
	let gradient: string;

	$: gradient = `linear-gradient(to bottom, ${config.stops.map((stop) => stop.color).join(', ')})`;
</script>

{#if config}
	<div
		class="bg-white border border-gray-200 rounded-lg shadow w-52 flex flex-col justify-center items-start"
	>
		<div class="rounded-t-lg bg-blue-600 w-full p-5">
			<span class="text-xl font-medium text-white">{config.label}</span><br />
			{#if config.description !== ''}
				<span class="text-base font-medium text-white">{config.description}</span>
			{/if}
		</div>
		<div class="m-5 flex flex-row justify-start items-stretch space-x-5 h-64">
			<div class="w-16" style={`background: ${gradient};`} />
			<div class="flex flex-col justify-between">
				{#each config.labels as label}
					<span class="text-lg font-medium text-black">{label}</span>
				{/each}
			</div>
		</div>
	</div>
{/if}
