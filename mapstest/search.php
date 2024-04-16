<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['q'])) {
    $searchQuery = $_GET['q'];

    $conn = connectDB();

    // Escape special characters to prevent SQL injection
    $searchQuery = $conn->real_escape_string($searchQuery);

    $sql = "SELECT * FROM locations WHERE name LIKE '%$searchQuery%'";
    $result = $conn->query($sql);

    $locations = array();
    while ($row = $result->fetch_assoc()) {
        $locations[] = $row;
    }

    $conn->close();

    header('Content-Type: application/json');
    echo json_encode($locations);
} else {
    http_response_code(400);
    echo json_encode(array('error' => 'Bad Request'));
}
?>
