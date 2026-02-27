<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Offer Letter</title>
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
            max-width: 680px;
            margin: 40px auto;
            background: #fff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 8px 40px rgba(0, 0, 0, .08);
        }

        .header {
            background: linear-gradient(135deg, #1A2B3D 0%, #1F7A6E 100%);
            padding: 48px 48px 40px;
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
            background: rgba(255, 255, 255, .15);
            color: #a7f3d0;
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 3px;
            text-transform: uppercase;
            padding: 6px 14px;
            border-radius: 100px;
            border: 1px solid rgba(255, 255, 255, .2);
            margin-bottom: 16px;
        }

        .header h1 {
            color: #fff;
            font-size: 28px;
            font-weight: 900;
            line-height: 1.2;
        }

        .header p {
            color: rgba(255, 255, 255, .7);
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
            margin-bottom: 32px;
        }

        .offer-card {
            background: linear-gradient(135deg, #f0fdf9 0%, #ecfdf5 100%);
            border: 1.5px solid #6ee7b7;
            border-radius: 16px;
            padding: 32px;
            margin-bottom: 32px;
        }

        .offer-title {
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: #1F7A6E;
            margin-bottom: 20px;
        }

        .offer-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 14px 0;
            border-bottom: 1px solid #d1fae5;
        }

        .offer-row:last-child {
            border-bottom: none;
        }

        .offer-label {
            font-size: 12px;
            font-weight: 700;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .offer-value {
            font-size: 15px;
            font-weight: 900;
            color: #1A2B3D;
        }

        .salary-value {
            font-size: 22px;
            font-weight: 900;
            color: #1F7A6E;
        }

        .notes-section {
            background: #f8fafc;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 32px;
            border-left: 4px solid #1F7A6E;
        }

        .notes-section p {
            color: #4a5568;
            font-size: 14px;
            line-height: 1.7;
        }

        .cta {
            text-align: center;
            margin: 32px 0;
        }

        .cta p {
            color: #4a5568;
            font-size: 14px;
            margin-bottom: 16px;
            line-height: 1.6;
        }

        .steps {
            display: flex;
            gap: 16px;
            margin-bottom: 32px;
        }

        .step {
            flex: 1;
            text-align: center;
            padding: 20px 16px;
            background: #f8fafc;
            border-radius: 12px;
            border: 1px solid #e5e7eb;
        }

        .step-num {
            width: 28px;
            height: 28px;
            background: #1F7A6E;
            color: #fff;
            border-radius: 50%;
            font-weight: 900;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 8px;
        }

        .step-label {
            font-size: 11px;
            font-weight: 700;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .footer {
            background: #1A2B3D;
            padding: 32px 48px;
            text-align: center;
        }

        .footer p {
            color: rgba(255, 255, 255, .5);
            font-size: 12px;
            line-height: 1.7;
        }

        .footer strong {
            color: rgba(255, 255, 255, .9);
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
            <div class="badge">🎉 Official Offer Letter</div>
            <h1>Congratulations,<br>{{ explode(' ', $applicant->name)[0] }}!</h1>
            <p>We are delighted to extend this offer of employment.</p>
        </div>

        <div class="body">
            <p class="greeting">Dear {{ $applicant->name }},</p>
            <p class="intro">
                We are thrilled to inform you that after careful consideration,
                <strong>{{ $applicant->tenant->name ?? 'Droga Pharma' }}</strong>
                would like to formally offer you the position of <strong>{{ $jobPosting->title }}</strong>.
                We believe your skills and experience are an excellent match for our team, and we look forward to you
                joining us.
            </p>

            <div class="offer-card">
                <p class="offer-title">📄 Your Offer Details</p>
                <div class="offer-row">
                    <span class="offer-label">Position</span>
                    <span class="offer-value">{{ $jobPosting->title }}</span>
                </div>
                <div class="offer-row">
                    <span class="offer-label">Department</span>
                    <span class="offer-value">{{ $jobPosting->department ?? 'To be confirmed' }}</span>
                </div>
                <div class="offer-row">
                    <span class="offer-label">Location</span>
                    <span class="offer-value">{{ $jobPosting->location ?? 'Addis Ababa' }}</span>
                </div>
                <div class="offer-row">
                    <span class="offer-label">Employment Type</span>
                    <span class="offer-value">{{ ucfirst($jobPosting->type ?? 'Full-Time') }}</span>
                </div>
                <div class="offer-row">
                    <span class="offer-label">Start Date</span>
                    <span class="offer-value">{{ $startDate }}</span>
                </div>
                <div class="offer-row">
                    <span class="offer-label">Offered Salary</span>
                    <span class="salary-value">{{ $offeredSalary }}</span>
                </div>
            </div>

            @if($notes)
                <div class="notes-section">
                    <p class="offer-title" style="margin-bottom:10px;">📝 Additional Notes</p>
                    <p>{{ $notes }}</p>
                </div>
            @endif

            <div class="cta">
                <p>
                    To formally accept this offer, please reply to this email with your acceptance confirmation, or
                    contact our HR team directly.
                    We kindly ask you to respond within <strong>5 business days</strong>.
                </p>
            </div>

            <div class="steps">
                <div class="step">
                    <div class="step-num">1</div>
                    <div class="step-label">Review Offer</div>
                </div>
                <div class="step">
                    <div class="step-num">2</div>
                    <div class="step-label">Accept & Reply</div>
                </div>
                <div class="step">
                    <div class="step-num">3</div>
                    <div class="step-label">Onboarding</div>
                </div>
            </div>

            <p style="color:#4a5568;font-size:14px;line-height:1.7;">
                We are excited about the prospect of you joining the {{ $applicant->tenant->name ?? 'Droga Pharma' }}
                family.
                Should you have any questions about this offer, please don't hesitate to reach out.
            </p>
            <p style="margin-top:20px;color:#4a5568;font-size:14px;">
                Warm regards,<br>
                <strong style="color:#1A2B3D;">The Hiring Team</strong><br>
                <span style="color:#1F7A6E;">{{ $applicant->tenant->name ?? 'Droga Pharma' }}</span>
            </p>
        </div>

        <div class="footer">
            <p>This offer is subject to background verification and signing of the employment contract.</p>
            <p style="margin-top:8px;">© {{ date('Y') }}
                <strong>{{ $applicant->tenant->name ?? 'Droga Pharma' }}</strong>. All rights reserved.</p>
        </div>
    </div>
</body>

</html>