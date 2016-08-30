<?php
require_once 'vendor/autoload.php'; // Including composer's autoloader

// Creating client instance
$client = new Inventorus\InventorusClient(); // TODO: Insert API key

try {
  // Fetching warehouse from Inventorus
  $warehouse = $client->listWarehouse();
  // Settin code to 200
  http_response_code(200);
  // Returning response like JSON
  echo json_encode($warehouse);
} catch (Exception $e) {
  // In case of API error returning code 500
  http_response_code(500);
}
