<?php
$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "diabetes_pledge";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
