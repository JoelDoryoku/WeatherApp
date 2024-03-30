<script lang="ts">
    import { weatherData } from "../stores.js";                 // Import the weatherData store
    import { type WeatherData } from "../types/weatherData.ts"; // Import the WeatherData type

    // Initialize data with null
    let data: WeatherData | null = null;   

    // Initialize svgCondition as an empty string
    let svgCondition: string = '';

    // Get the current day of the week
    let dayOfWeek = new Date().toLocaleString("en-us", { weekday: "long" });

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

        // Get the current weather condition svg icon name
        svgCondition = data ? data.current.condition.text.toLowerCase().replace(' ', '-') : '';
    });
</script>

{#if data}
    <!-- Day of the week -->
    <span class="text-lg">{dayOfWeek}</span>

    <!-- Location name with icon -->
    <div class="flex gap-0.5 font-bold">
        {data.location.name}
        <i data-svelte-h="svelte-yv38kx">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="ml-0.5 h-4 w-4 fill-none stroke-black dark:stroke-white">
                <path d="M7.39993 6.32003L15.8899 3.49003C19.6999 2.22003 21.7699 4.30003 20.5099 8.11003L17.6799 16.6C15.7799 22.31 12.6599 22.31 10.7599 16.6L9.91993 14.08L7.39993 13.24C1.68993 11.34 1.68993 8.23003 7.39993 6.32003Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M10.1101 13.6501L13.6901 10.0601" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
        </i>
    </div>

    <!-- Temperature -->
    <span class="font-bold text-7xl block mx-auto py-5">{data.current.temp_c}º</span>

    <!-- Weather icon -->
    <span>
        <img src="/icons/wi-{svgCondition}-day.svg" alt="{svgCondition} image" />
    </span>

    <!-- Weather condition text -->
    <span>{data.current.condition.text}</span>
{/if}