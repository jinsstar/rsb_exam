<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Jobs\SendTaskReminderEmail;
use App\Mail\TaskReminderMail;
use Illuminate\Support\Facades\Mail;

class TaskController extends Controller
{
    public function index($id){
        try {
            $task = Task::where("user_id",$id)->get();

            $return["data"] = $task;
            $return["status"] = "success";
        } catch (\Throwable $th) {
            $return["status"] = "error";
        }
        return $return;
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:255',
            'description' => 'required',
        ]);

        try {
            $data = $request->all();
            $data->due_date = Carbon::tomorrow();
            dd($data);
            Task::create($request->all());
            $return['status'] = "success";
        } catch (\Throwable $th) {
            dd(2342143);
            $return['status'] = "error";
        }

        return $return;
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|max:255',
            'description' => 'required',
        ]);

        try {
            $task = Task::find($id);
            $task->update($request->all());
            $return['status'] = "success";
        } catch (\Throwable $th) {
            $return['status'] = "error";
        }

        return $return;
    }

    public function dispatch_task(){

        // Send email using the Mailable
        // Mail::to($user->email)->send(new VerificationEmail($verificationUrl));
        // Mail::to("stevenacosta0203@gmail.com")->send(new VerificationEmail($verificationUrl));
        // $data["user"]            = "Test";
        // $data["task"]           = "test";
        // Mail::to("jinsstar27@gmail.com")->send(new TaskReminderMail($data));
        dispatch(new SendTaskReminderEmail());
    }

    public function delete(Request $request, $id)
    {
        try {
            $task = Task::find($id);
            $task->delete();
            $return['status'] = "success";
        } catch (\Exception $e) {
            $return['status'] = $e;
        }
        return $return;
    }

}
