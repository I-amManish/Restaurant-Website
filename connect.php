<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include PHPMailer files
require 'path/to/PHPMailer/src/Exception.php';
require 'path/to/PHPMailer/src/PHPMailer.php';
require 'path/to/PHPMailer/src/SMTP.php';

// Database connection (adjust as per your setup)
$host = "localhost";
$username = "root";
$password = "";
$database = "your_database_name";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve form data
    $name = $_POST['userName'];
    $address = $_POST['userAddress'];
    $mobile = $_POST['userMobile'];
    $paymentMode = $_POST['paymentMode'];
    $upiID = $_POST['upiID'] ?? null; // Optional field
    $discountCoupon = $_POST['discountCoupon'] ?? null; // Optional field

    // Insert data into the database
    $stmt = $conn->prepare("INSERT INTO orders (name, address, mobile, payment_mode, upi_id, discount_coupon) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $name, $address, $mobile, $paymentMode, $upiID, $discountCoupon);

    if ($stmt->execute()) {
        // Data inserted successfully, now send the email
        try {
            $mail = new PHPMailer(true);

            // Server settings
            $mail->isSMTP();
            $mail->Host = 'smtp.elasticemail.com'; // Your SMTP host
            $mail->SMTPAuth = true;
            $mail->Username = 'immanish0003@gmail.com'; // Your SMTP username
            $mail->Password = 'CA82AB992D43F4290D78FC0887C36DB76F39'; // Your SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            // Recipients
            $mail->setFrom('immanish0003@gmail.com', 'Restaurant Orders');
            $mail->addAddress('immanish0003@gmail.com'); // Your recipient email

            // Content
            $mail->isHTML(true);
            $mail->Subject = 'New Order Received';
            $mail->Body = "
                <h3>New Order Details</h3>
                <p><strong>Name:</strong> $name</p>
                <p><strong>Address:</strong> $address</p>
                <p><strong>Mobile:</strong> $mobile</p>
                <p><strong>Payment Mode:</strong> $paymentMode</p>
                " . ($upiID ? "<p><strong>UPI ID:</strong> $upiID</p>" : "") . "
                " . ($discountCoupon ? "<p><strong>Discount Coupon:</strong> $discountCoupon</p>" : "") . "
            ";

            // Send email
            $mail->send();
            echo "Order placed and email sent successfully.";
        } catch (Exception $e) {
            echo "Order placed, but email could not be sent. Error: {$mail->ErrorInfo}";
        }
    } else {
        echo "Failed to place order: " . $stmt->error;
    }

    $stmt->close();
}
$conn->close();
?>
