# Email Backend Setup Instructions

## Issues Fixed

1. **Email Recipient Problem**: The code was sending emails to the SMTP user instead of a target recipient
2. **Missing Environment Variables**: No `.env` file with required Gmail SMTP configuration
3. **Poor Error Handling**: Limited debugging information when emails fail

## Setup Instructions

### 1. Create Environment File

Create a `.env` file in your project root with the following variables:

```env
# Gmail SMTP Configuration
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Server Configuration
PORT=3000
CORS_ORIGIN=*

# Target email to receive form submissions
TARGET_EMAIL=recipient@example.com
```

### 2. Gmail App Password Setup

1. Go to your Google Account settings
2. Enable 2-Factor Authentication if not already enabled
3. Go to "Security" → "App passwords"
4. Generate a new app password for "Mail"
5. Use this app password as `SMTP_PASS` in your `.env` file

### 3. Configuration Details

- `SMTP_USER`: Your Gmail address
- `SMTP_PASS`: Your Gmail app password (not your regular password)
- `TARGET_EMAIL`: The email address where you want to receive form submissions
- `PORT`: Server port (default: 3000)

### 4. Testing

1. Start your server: `npm run dev`
2. Send a POST request to `http://localhost:3000/api/v1/mail` with this body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "123-456-7890",
  "company": "Test Company",
  "message": "This is a test message"
}
```

### 5. Troubleshooting

- Check console logs for detailed error messages
- Verify your Gmail app password is correct
- Ensure 2FA is enabled on your Gmail account
- Check that `TARGET_EMAIL` is set to a valid email address
- Verify your Gmail account allows "less secure app access" if needed

## Code Changes Made

1. **Controller**: Added validation for required fields and better error handling
2. **Nodemailer**: Added SMTP connection verification and detailed logging
3. **Email Recipient**: Fixed to send to target email instead of SMTP user
4. **Error Handling**: Improved error messages and debugging information
