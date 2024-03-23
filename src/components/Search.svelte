<script lang="ts">
    import { weatherData } from '../stores.js';

    // Initialize search variable
    let search = '';

    // API Key
    const API_KEY = import.meta.env.PUBLIC_API_KEY; // Get API key from environment variable

    // Function to construct the URL
    function constructUrl() {
        return `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${search}`;
    }

    // Function to handle the response
    async function handleResponse(response: Response) {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}, url: ${response.url}`);
        }
        return await response.json();
    }

    // Function to fetch data
    async function fetchData() {
        const url = constructUrl();
        const response = await fetch(url);
        return await handleResponse(response);
    }

    // Function to handle data
    function handleData(data: JSON) {
        // Save the data to the store
        $weatherData = JSON.stringify(data);
    }

    // Function to handle error
    function handleError(error: unknown) {
        console.error('An error occurred:', error); // Replace with your actual error handling logic
    }

    // Function to search weather
    async function searchWeather() {
        try {
            // Fetch the data
            const data = await fetchData();

            // Handle the data
            handleData(data);
        } catch (error) {
            handleError(error);
        }
    }
</script>

<div>
    <!-- Input field for search -->
    <input bind:value={search} type="text" placeholder="Search for a city" />

    <!-- Button to trigger search -->
    <button on:click={searchWeather}>Search</button>
</div>