<?php
function connectDB() {
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "map_database";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    return $conn;
}
function getLocations() {
    $conn = connectDB();

    $sql = "SELECT * FROM locations";
    $result = $conn->query($sql);

    $locations = array();
    while ($row = $result->fetch_assoc()) {
        $locations[] = $row;
    }

    $conn->close();

    return $locations;
}

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode(getLocations());
} else {
    http_response_code(405);
    echo json_encode(array('error' => 'Method Not Allowed'));
}

?>
