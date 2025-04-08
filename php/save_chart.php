<?php
header('Content-Type: application/json');

// Configuración de la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "db";

// Habilitar reporte de errores (solo para desarrollo)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

try {
    // Crear conexión
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    // Verificar conexión
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }

    // Verificar método HTTP
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception("Only POST requests are allowed");
    }

    // Obtener datos JSON del cuerpo de la solicitud
    $json = file_get_contents('php://input');
    if (empty($json)) {
        throw new Exception("No data received");
    }

    $data = json_decode($json, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Invalid JSON: " . json_last_error_msg());
    }

    // Validar datos requeridos
    if (empty($data['name'])) {
        throw new Exception("Chart name is required");
    }

    if (empty($data['config'])) {
        throw new Exception("Chart configuration is required");
    }

    $chartName = $data['name'];
    $config = json_encode($data['config']);
    
    // Validar que el JSON de configuración sea válido
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Invalid chart configuration: " . json_last_error_msg());
    }

    // Preparar consulta SQL
    $sql = "INSERT INTO charts (name, config) VALUES (?, ?) 
            ON DUPLICATE KEY UPDATE config = VALUES(config)";
    
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        throw new Exception("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param("ss", $chartName, $config);
    $success = $stmt->execute();

    if (!$success) {
        throw new Exception("Execute failed: " . $stmt->error);
    }

    $affectedRows = $stmt->affected_rows;
    $stmt->close();
    $conn->close();

    echo json_encode([
        'status' => 'success',
        'message' => 'Configuration saved successfully',
        'affected_rows' => $affectedRows
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage(),
        'trace' => $e->getTraceAsString() // Solo para desarrollo
    ]);
}
?>