<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Application Update</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            background: #f0f4f8;
        }

        .wrapper {
            max-width: 660px;
            margin: 40px auto;
            background: #fff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 8px 40px rgba(0, 0, 0, .08);
        }

        .header {
            background: linear-gradient(135deg, #1A2B3D 0%, #374151 100%);
            padding: 48px;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 32px;
        }

        .logo-box {
            background: #fff;
            color: #1A2B3D;
            width: 36px;
            height: 36px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 900;
            font-size: 18px;
        }

        .logo-name {
            color: #fff;
            font-weight: 900;
            font-size: 20px;
            letter-spacing: -0.5px;
        }

        .badge {
            display: inline-block;
            background: rgba(255, 255, 255, .1);
            color: #d1d5db;
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 3px;
            text-transform: uppercase;
            padding: 6px 14px;
            border-radius: 100px;
            border: 1px solid rgba(255, 255, 255, .15);
            margin-bottom: 16px;
        }

        .header h1 {
            color: #fff;
            font-size: 26px;
            font-weight: 900;
            line-height: 1.25;
        }

        .header p {
            color: rgba(255, 255, 255, .6);
            font-size: 14px;
            margin-top: 6px;
        }

        .body {
            padding: 48px;
        }

        .greeting {
            font-size: 16px;
            color: #1A2B3D;
            font-weight: 700;
            margin-bottom: 16px;
        }

        .intro {
            color: #4a5568;
            font-size: 15px;
            line-height: 1.7;
            margin-bottom: 24px;
        }

        .position-card {
            background: #f8fafc;
            border: 1.5px solid #e5e7eb;
            border-radius: 14px;
            padding: 24px 28px;
            margin-bottom: 28px;
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .pos-icon {
            width: 44px;
            height: 44px;
            background: #1A2B3D;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 20px;
            flex-shrink: 0;
        }

        .pos-label {
            font-size: 10px;
            font-weight: 800;
            color: #9ca3af;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        .pos-value {
            font-size: 16px;
            font-weight: 900;
            color: #1A2B3D;
            margin-top: 2px;
        }

        .note-box {
            background: #f0fdf4;
            border: 1.5px solid #bbf7d0;
            border-radius: 14px;
            padding: 24px 28px;
            margin-bottom: 28px;
            border-left: 4px solid #1F7A6E;
        }

        .note-label {
            font-size: 10px;
            font-weight: 800;
            color: #1F7A6E;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 8px;
        }

        .note-text {
            font-size: 15px;
            color: #374151;
            line-height: 1.7;
            font-style: italic;
        }

        .encouragement {
            background: linear-gradient(135deg, #1A2B3D 0%, #1F7A6E 100%);
            border-radius: 14px;
            padding: 28px;
            margin-bottom: 28px;
            text-align: center;
        }

        .encouragement p {
            color: rgba(255, 255, 255, .85);
            font-size: 14px;
            line-height: 1.7;
        }

        .encouragement strong {
            color: #fff;
        }

        .closing {
            color: #4a5568;
            font-size: 15px;
            line-height: 1.7;
            margin-bottom: 28px;
        }

        .sig {
            margin-top: 20px;
        }

        .sig strong {
            color: #1A2B3D;
            font-size: 15px;
        }

        .sig span {
            color: #1F7A6E;
            font-size: 13px;
            display: block;
            margin-top: 2px;
        }

        .footer {
            background: #1A2B3D;
            padding: 28px 48px;
            text-align: center;
        }

        .footer p {
            color: rgba(255, 255, 255, .45);
            font-size: 11px;
            line-height: 1.7;
        }

        .footer strong {
            color: rgba(255, 255, 255, .8);
        }
    </style>
</head>

<body>
    <div class="wrapper">
        <div class="header">
            <div class="logo">
                <div class="logo-box">D</div>
                <span class="logo-name">{{ $applicant->tenant->name ?? 'Droga Pharma' }}</span>
            </div>
            <div class="badge">📋 Application Update</div>
            <h1>Thank You for<br>Your Application</h1>
            <p>We appreciate the time you invested with us.</p>
        </div>

        <div class="body">
            <p class="greeting">Dear {{ $applicant->name }},</p>
            <p class="intro">
                Thank you sincerely for your interest in joining
                <strong>{{ $applicant->tenant->name ?? 'Droga Pharma' }}</strong>
                and for taking the time to apply. We genuinely value every application we receive, and yours was given
                careful consideration.
            </p>

            <div class="position-card">
                <div class="pos-icon">💼</div>
                <div>
                    <div class="pos-label">Position Applied For</div>
                    <div class="pos-value">{{ $jobPosting->title }}</div>
                    @if($jobPosting->department)
                        <div style="font-size:12px;color:#6b7280;margin-top:2px;">{{ $jobPosting->department }} ·
                            {{ $jobPosting->location ?? 'Addis Ababa' }}</div>
                    @endif
                </div>
            </div>

            <p class="closing">
                After thorough review of all applications, we have decided to move forward with candidates whose
                profiles
                most closely match our current requirements. This was a difficult decision, as we received many strong
                applications.
            </p>

            @if(!empty($rejectionNote))
                <div class="note-box">
                    <div class="note-label">📝 A Note from Our Team</div>
                    <div class="note-text">{{ $rejectionNote }}</div>
                </div>
            @endif

            <div class="encouragement">
                <p>
                    <strong>Please don't be discouraged.</strong> Your skills and experience are valuable, and
                    we encourage you to apply for future openings that match your profile.
                    We will keep your application on file and may reach out if a suitable opportunity arises.
                </p>
            </div>

            <p class="closing">
                We wish you every success in your career journey and hope our paths will cross again.
            </p>

            <div class="sig">
                <p style="color:#4a5568;font-size:14px;">Warm regards,</p>
                <strong>The Hiring Team</strong>
                <span>{{ $applicant->tenant->name ?? 'Droga Pharma' }}</span>
            </div>
        </div>

        <div class="footer">
            <p>This notification was sent as part of our transparent recruitment process.</p>
            <p style="margin-top:6px;">© {{ date('Y') }}
                <strong>{{ $applicant->tenant->name ?? 'Droga Pharma' }}</strong>. All rights reserved.</p>
        </div>
    </div>
</body>

</html>