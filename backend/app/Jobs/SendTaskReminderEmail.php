<?php

namespace App\Jobs;

use App\Models\Task;
use App\Models\User;
use App\Mail\TaskReminderMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;

class SendTaskReminderEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $tomorrow = Carbon::tomorrow();

        // Fetch all tasks due tomorrow
        $tasks = Task::whereDate('due_date', $tomorrow)->get();
        // Group tasks by user
        $usersWithTasks = $tasks->groupBy('user_id');
        
        foreach ($usersWithTasks as $userId => $userTasks) {
            $user = User::find($userId);
            
            if ($user && $user->email) {
                $data["user"]            = $user->name;
                $data["tasks"]           = $userTasks;
                // dd($userTasks);
                Mail::to($user->email)->send(new TaskReminderMail($data));
                // $data["user"]            = $user->name;
                // $data["task"]           = $userTasks;
                // // dd($user->email);
                // Mail::to($user->email)->send(new TaskReminderMail($data));
            }
        }
    }
}