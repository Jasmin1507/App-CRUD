# CRUDApplication
This is a project I created using material UI (Angular 15), and JSON server.

# Requirements:

-Angular material UI
 Install Angular Material, Angular CDK, and Angular Animations:
 `npm install @angular/material @angular/cdk @angular/animations --save ` .
 Then add command will update by using the Angular CLI, perform configuration changes, and execute initialization code:
 `ng add @angular/material`

-Json fake server

First install JSON server fake RESTAPI with command in terminal `npm i -g json-server`.
Then run `json-server --watch db.json` and add another array in your new created 'db.json' ` "employees": []; `.
The data (json) you entered is on port 3000 : `http://localhost:3000/`,
and employees data is on `http://localhost:3000/employees`.

Type the command `npm install` and after that `ng serve`.

# About the project: 

This is my first project in Angular, since I am a front-end developer,
I used a fake REST API and thus imitated the back-end for creating demo API.
I also used Angular Material UI so the app is responsive on different devices.
This type of application includes basic operations - creating (Create), reading (Read),
updating (Update) and deleting (Delete) employee data.
This CRUD application for employees makes it easier for organizations to effectively manage information about their employees, 
improves security and control, and provides quick and easy access to relevant information.

# What I implement:
-Viewing and filtering: I enabled users to view all employees with the ability to filter and sort by different attributes.
-Adding employees: I enabled users to add new employees to the system via the data entry form, 
with correctness check and validation of the entered data.
-Editing Employee Information: Users can update employee information, including changes to contact information.
-Deleting an employee: Users can delete an employee's profile from the system by displaying a confirmation or confirmation prompt before deletion.
- ...
