<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class CandidateMention extends Notification
{
    use Queueable;

    protected $applicant;
    protected $senderName;
    protected $senderId;
    protected $note;

    public function __construct($applicant, $senderName, $note, $senderId = null)
    {
        $this->applicant = $applicant;
        $this->senderName = $senderName;
        $this->note = $note;
        $this->senderId = $senderId;
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'candidate_mention',
            'title' => "Message from {$this->senderName}",
            'message' => "{$this->senderName} mentioned you on candidate {$this->applicant->name}: \"{$this->note}\"",
            'applicant_id' => $this->applicant->id ?? null,
            'sender_id' => $this->senderId,
            'sender_name' => $this->senderName,
        ];
    }
}
