import { useState } from 'react';
import axios from 'axios';
import OpenAI from 'openai';

export default function WeatherForecast() {
  const [airportICAO, setAirportICAO] = useState('');
  const [weatherData, setWeatherData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const baseURL = 'https://api.aimlapi.com/v1';

      // Insert your AIML API Key in the quotation marks instead of my_key:
      const apiKey = 'dd3e2726e4814ae7b4740d1122545e09';

      const systemPrompt = 'You are a professional weather station.';
      const userPrompt = `Please send us the weather forecast and METAR for the following airport ICAO:
          ${airportICAO}`;

      const api = new OpenAI({
        apiKey,
        baseURL,
        dangerouslyAllowBrowser: true, // TODO: move to backend Node.JS
      });

      const completion = await api.chat.completions.create({
        model: 'mistralai/Mistral-7B-Instruct-v0.2',
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 256,
      });

      const response = completion.choices[0].message.content;

      console.log('User:', userPrompt);
      console.log('AI:', response);

      const weatherInfo = response || 'No weather data available';
      setWeatherData(weatherInfo);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.error?.message ||
            'Failed to fetch weather data. Please check your API key and try again.'
        );
      } else {
        setError('An unexpected error occurred');
      }
      console.error('Error fetching weather:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className='max-w-sm mx-auto' onSubmit={handleSubmit}>
        <div className='mb-5'>
          <label
            htmlFor='airportICAO'
            className='block mb-2 text-sm font-medium text-gray-900'
          >
            Airport ICAO
          </label>
          <input
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            type='text'
            id='airportICAO'
            onChange={(e) => setAirportICAO(e.target.value)}
            value={airportICAO}
            required
          />
        </div>
        <button
          className='text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:opacity-50 disabled:cursor-not-allowed'
          type='submit'
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Get weather forecast'}
        </button>
      </form>

      {error && (
        <div className='max-w-sm mx-auto mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg'>
          <p className='font-medium'>Error:</p>
          <p>{error}</p>
        </div>
      )}

      {weatherData && (
        <div className='max-w-sm mx-auto mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
          <h3 className='font-bold text-lg mb-2 text-gray-900'>
            Weather Forecast for {airportICAO.toUpperCase()}
          </h3>
          <p className='text-gray-700 whitespace-pre-wrap'>{weatherData}</p>
        </div>
      )}
    </div>
  );
}
