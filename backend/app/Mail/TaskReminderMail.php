<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class TaskReminderMail extends Mailable
{
    use Queueable, SerializesModels;

    protected $data;

    public function __construct($data_payload)
    {
        $this->data = $data_payload; 
    }


    public function build()
    {
        $data["_data"] = $this->data;
        return $this->subject('Task Reminder: Tasks Due Tomorrow')
                    ->with($data)
                    ->view('emails.task_reminder');
    }
}
