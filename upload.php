<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name']);
    $designation = trim($_POST['designation']);
    $pledge = trim($_POST['pledge']);

    if (empty($name) || empty($designation) || empty($pledge)) {
        echo "<script>alert('Please fill all fields!');window.history.back();</script>";
        exit;
    }

    $photoName = '';
    if (!empty($_POST['croppedPhoto'])) {
        $base64 = $_POST['croppedPhoto'];
        $img = str_replace('data:image/jpeg;base64,', '', $base64);
        $img = str_replace(' ', '+', $img);
        $photoData = base64_decode($img);

        $uploadDir = 'uploads/';
        if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);
        $photoName = time() . '_' . uniqid() . '.jpg';
        file_put_contents($uploadDir . $photoName, $photoData);
    } else if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
        $ext = pathinfo($_FILES['photo']['name'], PATHINFO_EXTENSION);
        $photoName = time() . '_' . uniqid() . '.' . $ext;
        move_uploaded_file($_FILES['photo']['tmp_name'], 'uploads/' . $photoName);
    } else {
        echo "<script>alert('Please upload your photo!');window.history.back();</script>";
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO pledges (name, designation, pledge, photo) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $designation, $pledge, $photoName);
    if ($stmt->execute()) {
        echo "<script>alert('Pledge submitted successfully!');window.location.href='index.html';</script>";
    } else {
        echo "<script>alert('Database error!');window.history.back();</script>";
    }
    $stmt->close();
    $conn->close();
}
