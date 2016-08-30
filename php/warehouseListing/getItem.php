<?php
require_once 'vendor/autoload.php'; // Including composer's autoloader

// Getting parameters from query
$id = $_GET['id'];

// Creating client instance
$client = new Inventorus\InventorusClient(); // TODO: Insert API key

try {
  // Fetching item details from Inventorus
  $item = $client->getItemDetails($id);
  // Settin code to 200
  http_response_code(200);
  // Returning response like JSON
  echo json_encode($item);
} catch (Exception $e) {
  // In case of API error returning code 500
  http_response_code(500);
}
