export const savedProviderTemplate = (recipientName: string) => {
    const htmlTemplate = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Spot.care</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f7f7f7;
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: auto;
                    background-color: #ffffff;
                    border: 1px solid #dddddd;
                    border-radius: 5px;
                    overflow: hidden;
                }
                .header {
                    background-color: #4CAF50;
                    color: white;
                    padding: 20px;
                    text-align: center;
                }
                .content {
                    padding: 20px;
                }
                .footer {
                    background-color: #f1f1f1;
                    text-align: center;
                    padding: 10px;
                    font-size: 12px;
                    color: #666;
                }
                a {
                    color: #4CAF50;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Welcome to Our Service!</h1>
                </div>
                <div class="content">
                    <h2>Hello ${recipientName},</h2>
                    <p>Thank you for using our service. We are excited to serve you!</p>
                    <p>please find the pdf file attached</p>
                    
                    <p>If you have any questions, feel free to reach out to our support team.</p>
                    <p>Best Regards,<br>Spot.care</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 Our Company. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        `;

    return htmlTemplate;
}

export const EmailVerificationTemplate = (firstName: string, otp: string) => {
    const htmlTemplate = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Spot.care</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f7f7f7;
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: auto;
                    background-color: #ffffff;
                    border: 1px solid #dddddd;
                    border-radius: 5px;
                    overflow: hidden;
                }
                .header {
                    background-color: #4CAF50;
                    color: white;
                    padding: 20px;
                    text-align: center;
                }
                .content {
                    padding: 20px;
                }
                .footer {
                    background-color: #f1f1f1;
                    text-align: center;
                    padding: 10px;
                    font-size: 12px;
                    color: #666;
                }
                a {
                    color: #4CAF50;
                    text-decoration: none;
                }
                .otp {
                    font-size: xxx-large;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="content">
                    <h2>Hello ${firstName},</h2>
                    <p>Please find your verification code, please don't share this to anyone</p>
                    <code class="otp">${otp}</code>
                    
                    <p>If you have any questions, feel free to reach out to our support team.</p>
                    <p>Best Regards,<br>Spot.care</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 Our Company. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        `;

    return htmlTemplate;
} 