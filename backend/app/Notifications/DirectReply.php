<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class DirectReply extends Notification
{
    use Queueable;

    protected string $replierName;
    protected int $replierId;
    protected string $message;
    protected string $candidateName;

    public function __construct(string $replierName, int $replierId, string $message, string $candidateName)
    {
        $this->replierName = $replierName;
        $this->replierId = $replierId;
        $this->message = $message;
        $this->candidateName = $candidateName;
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'direct_reply',
            'title' => "Reply from {$this->replierName}",
            'message' => "{$this->replierName} replied about {$this->candidateName}: \"{$this->message}\"",
            'sender_id' => $this->replierId,
            'sender_name' => $this->replierName,
        ];
    }
}
