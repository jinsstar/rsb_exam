<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Configure the paths, origins, methods, and headers that are allowed
    | for cross-origin requests. Adjust these settings as needed for your
    | application.
    |
    */
    'allowed_origins' => ['http://localhost:3000'],

    // Apply CORS settings only to API routes and Sanctum CSRF token requests
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    // Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    'allowed_methods' => ['*'],

    // Allow requests from any origin for development
    // Replace '*' with your frontend domain (e.g., 'http://localhost:3000') in production
    'allowed_origins' => ['*'],

    // Patterns for allowed origins (if wildcard matching is needed)
    'allowed_origins_patterns' => [],

    // Allow all headers (e.g., Authorization, Content-Type, etc.)
    'allowed_headers' => ['*'],

    // Expose specific headers in the response (if required by the frontend)
    'exposed_headers' => [],

    // Maximum age (in seconds) the browser should cache CORS preflight requests
    'max_age' => 0,

    // Enable this if cookies or authorization headers are needed (e.g., for authentication)
    'supports_credentials' => true,
];
