<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class DirectMessage extends Notification
{
    use Queueable;

    protected string $senderName;
    protected int $senderId;
    protected string $message;

    public function __construct(string $senderName, int $senderId, string $message)
    {
        $this->senderName = $senderName;
        $this->senderId = $senderId;
        $this->message = $message;
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'direct_message',
            'title' => "Message from {$this->senderName}",
            'message' => $this->message,
            'sender_id' => $this->senderId,
            'sender_name' => $this->senderName,
        ];
    }
}
