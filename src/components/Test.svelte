<script lang="ts">
     import { weatherData } from '../stores.js';

    let data: string | null;

    weatherData.subscribe((value): void => {
        data = value;
    });
</script>

<div>   
    {#if data}
        <pre>{data}</pre>
    {/if}
</div>
