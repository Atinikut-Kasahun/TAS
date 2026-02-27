<?php

namespace App\Mail;

use App\Models\Applicant;
use App\Models\JobPosting;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OfferLetter extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Applicant $applicant,
        public JobPosting $jobPosting,
        public string $offeredSalary,
        public string $startDate,
        public ?string $notes = null
    ) {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Congratulations! Your Offer Letter from ' . ($this->applicant->tenant->name ?? 'Droga Pharma'),
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.offer_letter',
        );
    }
}
