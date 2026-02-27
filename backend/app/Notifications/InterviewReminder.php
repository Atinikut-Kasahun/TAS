<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class InterviewReminder extends Notification
{
    use Queueable;

    protected $applicantName;
    protected $interviewTime;

    public function __construct($applicantName, $interviewTime)
    {
        $this->applicantName = $applicantName;
        $this->interviewTime = $interviewTime;
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'interview_reminder',
            'title' => 'Upcoming Interview',
            'message' => "You have an interview scheduled with {$this->applicantName} at {$this->interviewTime}.",
        ];
    }
}
