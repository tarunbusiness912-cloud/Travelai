export const getCoordinates = async (place) => {

  if (!place || place.trim() === "") {
    throw new Error("Destination is empty");
  }

  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(place.trim())}&count=1&language=en&format=json`
  );

  const data = await response.json();

  console.log("Geocoding Response:", data);

  if (!data.results || data.results.length === 0) {
    throw new Error(`Location not found: ${place}`);
  }

  return {
    latitude: data.results[0].latitude,
    longitude: data.results[0].longitude,
    name: data.results[0].name,
    country: data.results[0].country,
  };
};

export const getWeather = async (lat, lon) => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
  );

  const data = await response.json();

  return data.current;
};