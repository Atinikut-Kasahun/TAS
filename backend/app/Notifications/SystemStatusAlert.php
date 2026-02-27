<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SystemStatusAlert extends Notification
{
    use Queueable;

    protected $statusMessage;

    public function __construct($statusMessage)
    {
        $this->statusMessage = $statusMessage;
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'system_status',
            'title' => 'System Update',
            'message' => $this->statusMessage,
        ];
    }
}
