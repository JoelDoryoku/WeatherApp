<script lang="ts">
    import { weatherData } from '../stores.js';

    let data: JSON | null;
    let dayOfWeek = new Date().toLocaleString('en-us', {  weekday: 'long' });

    weatherData.subscribe(value => {
        if (value != '') data = JSON.parse(value);
        else data = null;
    });
</script>

<section>
    {#if data}
        <div class="flex flex-col justify-between rounded-xl border bg-card p-4 text-card-foreground shadow-sm">
            <span>{dayOfWeek}</span>
            <span>{data.location.name}</span>
            <span>{data.current.temp_c}º</span>
            <span>{data.current.condition.text}</span>
        </div>
    {/if}
</section>