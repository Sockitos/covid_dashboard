<script lang="ts">
	export let aces: string | null;
	export let concelho: string | null;
	export let freguesia: string | null;
	export let value: number | null;

	export let description: string;
</script>

<div
	class="bg-white border border-gray-200 rounded-lg shadow-sm w-96 p-5 flex flex-col justify-center items-center font-medium text-black text-center"
>
	{#if value !== null}
		<p>{aces}</p>
		<p>{concelho}</p>
		<p>{freguesia}</p>
		<p class="text-4xl font-bold text-black">{value}</p>
		<p class="text-xl font-medium text-gray-700">{description}</p>
	{:else}
		<p class="text-xl font-medium text-gray-700">
			PASSE O CURSOR SOBRE O MAPA PARA SABER O VALOR NAQUELA ZONA
		</p>
	{/if}
</div>
