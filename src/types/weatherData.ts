export interface WeatherData {
    location: {
        name: string;
        localtime: string;
    };
    current: {
        temp_c: number;
        condition: {
            text: string;
        };
        air_quality: {
            "gb-defra-index": number;
        };
    };
}