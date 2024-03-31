<script lang="ts">
    import { weatherData } from '../stores.js';

    // Initialize search variable
    let search = 'Barcelona';

    // API Key
    const API_KEY = import.meta.env.PUBLIC_API_KEY; // Get API key from environment variable

    /**
     * Constructs the URL for the weather API request.
     * @returns {string} The constructed URL.
     */
    function constructUrl(): string {
        return `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${search}&aqi=yes`;
    }
    
    /**
     * Determines the type of HTTP error based on the status code.
     * @param {number} status - The HTTP status code.
     * @returns {string} The type of HTTP error.
     */
    function getErrorType(status: number): string {
        switch (status) {
            case 400: return 'Bad Request';
            case 401: return 'Unauthorized';
            case 403: return 'Forbidden';
            case 404: return 'Not Found';
            case 500: return 'Internal Server Error';
            // Add more cases as needed
            default: return 'Unknown Error';
        }
    }

    /**
     * Handles the response from the API request.
     * @param {Response} response - The response object from the API request.
     * @returns {Promise<any>} A promise that resolves to the parsed JSON response.
     * @throws {Error} If the response status is not ok.
     */
    async function handleResponse(response: Response): Promise<any> {
        if (!response.ok) {
            const errorType = getErrorType(response.status);
            throw new Error(`HTTP error! status: ${response.status} (${errorType}), url: ${response.url}`);
        }
        return await response.json();
    }

    /**
     * Fetches weather data from the API.
     * @returns {Promise<any>} A promise that resolves to the fetched weather data.
     */
    async function fetchData(): Promise<any> {
        const url = constructUrl();
        const response = await fetch(url);
        return await handleResponse(response);
    }

    /**
     * Handles the fetched weather data.
     * @param {JSON} data - The fetched weather data.
     */
    function handleData(data: JSON): void {
        // Save the data to the store
        $weatherData = JSON.stringify(data);
    }

    /**
     * Handles errors that occur during the API request.
     * @param {unknown} error - The error object.
     */
    function handleError(error: unknown): void {
        console.error('An error occurred:', error);
        
        // TODO: Add user-friendly error handling here
    }

    /**
     * Searches for weather data based on the user's input.
     */
    async function searchWeather(): Promise<void> {
        try {
            // Fetch the data
            const data = await fetchData();

            // Handle the data
            handleData(data);
        } catch (error) {
            handleError(error);
        }
    }

    // First search on page load
    searchWeather();
</script>

<div>
    <!-- Input field for search -->
    <input bind:value={search} type="text" placeholder="Search for a city" />

    <!-- Button to trigger search -->
    <button on:click={searchWeather}>Search</button>
</div>