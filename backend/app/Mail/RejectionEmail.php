<?php

namespace App\Mail;

use App\Models\Applicant;
use App\Models\JobPosting;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class RejectionEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $applicant;
    public $job;
    public $tenant;
    public ?string $rejectionNote;

    /**
     * Create a new message instance.
     */
    public function __construct(Applicant $applicant, JobPosting $job, ?string $rejectionNote = null)
    {
        $this->applicant = $applicant;
        $this->job = $job;
        $this->tenant = $job->tenant;
        $this->rejectionNote = $rejectionNote;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Regarding your application for {$this->job->title} at {$this->tenant->name}",
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.rejection-email',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
