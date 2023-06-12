<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ArticleController extends Controller
{
    private $apiClients = [];

    public function __construct()
    {
        $this->initializeApiClients();
    }

    /**
     * Initialize the API clients.
     *
     * Define the configuration for each API client.
     */
    private function initializeApiClients()
    {
        $this->apiClients = [
            'newsapi' => [
                'base_uri' => 'https://newsapi.org/v2/everything',
                'api_key' => '8bb849fd47c3470a831e23cac8a10697',
                'api_key_param' => 'apiKey',
                'cache_key' => 'newsapi_articles',
                'cache_expiration' => 60, // Cache expiration in minutes
            ],
            'theguardian' => [
                'base_uri' => 'https://content.guardianapis.com/search',
                'api_key' => '46c38fc6-0fdf-42f7-b699-8bedf473b1eb',
                'api_key_param' => 'api-key',
                'additional_params' => 'show-fields',
                'cache_key' => 'theguardian_articles',
                'cache_expiration' => 60,
            ],
            'nytimes' => [
                'base_uri' => 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
                'api_key' => 'KtDXVXRFO61TZVlxaGGNnmyUamJubQRi',
                'api_key_param' => 'api-key',
                'cache_key' => 'nytimes_articles',
                'cache_expiration' => 60,
            ],
            // Add other API clients for different services
        ];
    }

    /**
     * Fetch articles based on the given keywords.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function fetchArticles(Request $request)
    {
        $keywords = explode(',', $request->input('keyword'));

        $articles = $this->getCachedArticles($keywords);

        return response()->json($articles);
    }

    /**
     * Get cached articles from the API clients.
     *
     * @param  array  $keywords
     * @return array
     */
    private function getCachedArticles(array $keywords)
    {
        $articles = [];

        foreach ($this->apiClients as $service => $apiClient) {
            $cacheKey = $this->generateCacheKey($service, implode('_', $keywords));
            $articles[$service] = Cache::remember($cacheKey, $apiClient['cache_expiration'], function () use ($apiClient, $keywords, $service) {
                $response = $this->makeApiRequest($apiClient, $keywords);
                return $this->processApiResponse($response, $service);
            });
        }

        return $articles;
    }

    /**
     * Generate a cache key for the given service and keyword.
     *
     * @param  string  $service
     * @param  string  $keyword
     * @return string
     */
    private function generateCacheKey(string $service, string $keyword)
    {
        return "{$service}_{$keyword}";
    }

    /**
     * Make an API request to retrieve articles.
     *
     * @param  array  $apiClient
     * @param  array  $keywords
     * @return array
     */
    private function makeApiRequest(array $apiClient, array $keywords)
    {
        $queryParams = [
            'q' => implode(' ', $keywords),
        ];

        $queryParams[$apiClient['api_key_param']] = $apiClient['api_key'];

        // Get thumbnail from the service
        if (isset($apiClient['additional_params'])) {
            $queryParams['show-fields'] = 'thumbnail';
        }

        $client = new Client();

        $response = $client->get($apiClient['base_uri'], [
            'query' => $queryParams,
        ]);

        return json_decode($response->getBody(), true);
    }

    /**
     * Process the API response based on the service.
     *
     * @param  array  $response
     * @param  string  $service
     * @return array
     */
    private function processApiResponse(array $response, string $service)
    {
        // You can process and manipulate the articles data based on the service

        return $response;
    }
}
