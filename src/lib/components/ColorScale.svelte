<script lang="ts">
	import type { ColorScaleConfig } from '$lib/constants';
	export let config: ColorScaleConfig;
</script>

{#if config}
	<div
		class="bg-white border border-gray-200 rounded-lg shadow w-60 flex flex-col justify-center items-center"
	>
		<div class="rounded-t-lg bg-blue-600 w-full p-5">
			<span class="text-xl font-medium text-white">{config.label}</span><br />
			{#if config.description !== ''}
				<span class="text-lg font-medium text-white">{config.description}</span>
			{/if}
		</div>
		<div class="p-5 mr-auto">
			{#each config.intervals as interval}
				<div class="w-full flex flex-row items-center space-x-5">
					<div class="h-8 w-16" style={`background-color: ${interval.color};`} />
					<span class="text-lg font-medium text-black">{interval.label}</span>
				</div>
			{/each}
		</div>
	</div>
{/if}
