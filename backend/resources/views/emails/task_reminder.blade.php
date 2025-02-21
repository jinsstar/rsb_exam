<!DOCTYPE html>
<html>
<head>
    <title>Task Reminder</title>
</head>
<body>
    <h2>Hello, {{ $_data["user"] }}</h2>
    <p>You have the following tasks due tomorrow:</p>
    <ul>
        @foreach($_data["tasks"] as $task)
            <li>{{ $task->name }}</li>
        @endforeach
    </ul>
    <p>Please make sure to complete them on time.</p>
</body>
</html>