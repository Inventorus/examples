<?php
require_once 'vendor/autoload.php'; // Including composer's autoloader

// Getting parameters from query
$steamid = $_GET['steamid'];

// Creating client instance
$client = new Inventorus\InventorusClient(); // TODO: Insert API key

try {
  // Fetching apps from Inventorus
  $apps = $client->getUsersApps($steamid);
  // Settin code to 200
  http_response_code(200);
  // Returning response like JSON
  echo json_encode($apps);
} catch (Exception $e) {
  // In case of API error returning code 500
  http_response_code(500);
}
