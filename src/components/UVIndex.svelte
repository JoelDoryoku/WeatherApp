<script lang="ts">
    import { weatherData } from "../stores.js";                 // Import the weatherData store
    import { type WeatherData } from "../types/weatherData.ts"; // Import the WeatherData type

    // Initialize data with null
    let data: WeatherData | null = null;

    // Subscribe to the weatherData store
    weatherData.subscribe((value) => {
        try {
            // Update the data variable whenever the store value changes
            data = value ? JSON.parse(value) : null;
        } catch (error) {
            // Log the error
            console.error(error);

            // TODO: Add user-friendly error handling here
        }
    });
</script>

{#if data}
    <div class="flex flex-row items-center gap-2 text-sm font-semibold leading-none tracking-tight text-neutral-600">
        <i>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 stroke-black dark:stroke-white">
                <path d="M12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M19.14 19.14L19.01 19.01M19.01 4.99L19.14 4.86L19.01 4.99ZM4.86 19.14L4.99 19.01L4.86 19.14ZM12 2.08V2V2.08ZM12 22V21.92V22ZM2.08 12H2H2.08ZM22 12H21.92H22ZM4.99 4.99L4.86 4.86L4.99 4.99Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
        </i>
        <span>UV Index</span>
    </div>

    <span class="font-semibold pt-2">{data.current.uv} / 11</span>

    <div class="mt-2 mb-4 progress relative h-2.5 w-full overflow-hidden rounded-full bg-[linear-gradient(90deg,#3a6eb4,#7ed457,#f8d449,#eb4d60,#b460e7,#b22222)]">
        <div class="absolute h-2.5 w-2.5 flex-1 rounded-full bg-black shadow-lg shadow-white ring-2 ring-white transition-all" style="left: {data.current.uv * 8.795}%;"></div>
    </div>

    {#if data.current.uv < 3}
        <span class="text-xs text-neutral-600">No protection needed.</span>
    {:else if data.current.uv >= 3 && data.current.uv < 6}
        <span class="text-xs text-neutral-600">Wear sunscreen.</span>
    {:else if data.current.uv >= 6 && data.current.uv < 8}
        <span class="text-xs text-neutral-600">Take precautions.</span>
    {:else if data.current.uv >= 8 && data.current.uv < 11}
        <span class="text-xs text-neutral-600">Take precautions.</span>
    {:else if data.current.uv >= 11}
        <span class="text-xs text-neutral-600">Take precautions.</span>
    {:else}
        <span class="text-xs text-neutral-600">Unknown</span>
    {/if}
{/if}