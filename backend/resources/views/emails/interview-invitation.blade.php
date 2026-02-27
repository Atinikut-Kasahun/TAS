<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #1A2B3D;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 40px auto;
            border: 1px solid #F0F0F0;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        }

        .header {
            background-color: #1F7A6E;
            color: #ffffff;
            padding: 40px;
            text-align: center;
        }

        .content {
            padding: 40px;
            background-color: #ffffff;
        }

        .footer {
            background-color: #F9FAFB;
            padding: 30px;
            text-align: center;
            font-size: 12px;
            color: #9CA3AF;
            text-transform: uppercase;
            letter-spacing: 0.1em;
        }

        h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 900;
            letter-spacing: -0.02em;
        }

        p {
            margin-bottom: 20px;
            font-size: 16px;
        }

        .highlight {
            color: #1F7A6E;
            font-weight: 700;
        }

        .signature {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #F0F0F0;
        }

        .company-name {
            font-weight: 900;
            color: #1A2B3D;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>Interview Invitation</h1>
        </div>
        <div class="content">
            <p>Dear <strong>{{ $applicant->name }}</strong>,</p>

            <p>Thank you for your interest in the <span class="highlight">{{ $job->title }}</span> position at <span
                    class="company-name">{{ $tenant->name }}</span>.</p>

            <p>We've reviewed your application and would like to invite you to an interview to learn more about your
                experience and fit for our team.</p>

            <p>Our hiring manager will be in touch shortly to coordinate a convenient time for the meeting.</p>

            <p>We look forward to speaking with you!</p>

            <div class="signature">
                <p>Best regards,<br>
                    <span class="company-name">{{ $tenant->name }} – TA Team</span>
                </p>
            </div>
        </div>
        <div class="footer">
            &copy; {{ date('Y') }} {{ $tenant->name }} &bull; Talent Acquisition Center
        </div>
    </div>
</body>

</html>