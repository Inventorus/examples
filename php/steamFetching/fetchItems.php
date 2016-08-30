<?php
require_once 'vendor/autoload.php'; // Including composer's autoloader

// Getting parameters from query
$steamid = $_GET['steamid'];
$appid = $_GET['appid'];

// Creating client instance
$client = new Inventorus\InventorusClient(); // TODO: Insert API key

try {
  // Fetching items from Inventorus
  $items = $client->getUsersItems($steamid, $appid);
  // Settin code to 200
  http_response_code(200);
  // Returning response like JSON
  echo json_encode($items);
} catch (Exception $e) {
  // In case of API error returning code 500
  http_response_code(500);
}
