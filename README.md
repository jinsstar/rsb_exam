# rsb_exam

Step to run the project

Frontend is created from React
Frontend
Run
-> npm install
-> npm run dev

for the backend
PHP version use php 8.2^
Laravel version 11.34
For database MySql

for the server I used Laragon Wamp to access database

Run
-> Composer install
-> php artisan migrate:fresh --seed  
-> php artisan serve

#admin defaults
email: admin@example.com
password: admin

#user defaults
auto create for random email - 10 users default and you can add in database seeder for more
default password: password

laravel job
run this in postman or any tool
http://localhost:8000/api/dispatch_task - no auth required and get request - this endpoint use to save task in database
php artisan queue:work - use to run the background task and send email.
note:
for email sending

You can use my smtp setup to send mail.
MAIL_DRIVER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your email
MAIL_PASSWORD=you password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=you email
