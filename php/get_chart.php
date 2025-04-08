<?php
header('Content-Type: application/json');

// Configuración de la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "db";

try {
    // Crear conexión
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    // Verificar conexión
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }

    $chartName = $_GET['name'] ?? '';
    if (empty($chartName)) {
        throw new Exception("Chart name parameter is required");
    }

    // Obtener configuración del gráfico desde la base de datos
    $sql = "SELECT config FROM charts WHERE name = ?";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        throw new Exception("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param("s", $chartName);
    if (!$stmt->execute()) {
        throw new Exception("Execute failed: " . $stmt->error);
    }

    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        // Verificar si el config es JSON válido
        $config = json_decode($row['config']);
        if (json_last_error() === JSON_ERROR_NONE) {
            echo $row['config'];
        } else {
            throw new Exception("Invalid JSON configuration in database");
        }
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Chart not found'
        ]);
    }

    $stmt->close();
    $conn->close();

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
?>