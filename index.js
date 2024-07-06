#! /usr/bin/env node
import inquirer from "inquirer";
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100;
    }
    enrollCourse(course) {
        if (!this.courses.includes(course)) {
            this.courses.push(course);
            console.log(`${this.name} enrolled in ${course} successfully`);
        }
        else {
            console.log(`${this.name} is already enrolled in ${course}`);
        }
    }
    viewBalance() {
        console.log(`Balance for ${this.name}: $${this.balance}`);
    }
    payFees(amount) {
        if (amount <= 0) {
            console.log("Amount should be greater than zero.");
            return;
        }
        this.balance -= amount;
        console.log(`$${amount} fee paid successfully by ${this.name}`);
        console.log(`Remaining Balance: $${this.balance}`);
    }
    showStatus() {
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses.join(", ")}`);
        console.log(`Balance: ${this.balance}`);
    }
}
class StudentManager {
    students;
    constructor() {
        this.students = [];
    }
    addStudent(name) {
        const student = new Student(name);
        this.students.push(student);
        console.log(`Student: ${name} added successfully. Student ID: ${student.id}`);
    }
    enrollStudent(studentId, course) {
        const student = this.findStudent(studentId);
        if (student) {
            student.enrollCourse(course);
        }
        else {
            console.log("Student not found. Please enter a correct student ID.");
        }
    }
    viewStudentBalance(studentId) {
        const student = this.findStudent(studentId);
        if (student) {
            student.viewBalance();
        }
        else {
            console.log("Student not found. Please enter a correct student ID.");
        }
    }
    payStudentFees(studentId, amount) {
        const student = this.findStudent(studentId);
        if (student) {
            student.payFees(amount);
        }
        else {
            console.log("Student not found. Please enter a correct student ID.");
        }
    }
    showStudentStatus(studentId) {
        const student = this.findStudent(studentId);
        if (student) {
            student.showStatus();
        }
        else {
            console.log("Student not found. Please enter a correct student ID.");
        }
    }
    findStudent(studentId) {
        return this.students.find((std) => std.id === studentId);
    }
}
async function main() {
    console.log("Student Management System");
    console.log("-".repeat(50));
    const studentManager = new StudentManager();
    while (true) {
        const choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option",
                choices: ["Add Student", "Enroll Student", "View Student Balance", "Pay Fees", "Show Status", "Exit"],
            },
        ]);
        switch (choice.choice) {
            case "Add Student":
                const nameInput = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a student name",
                    },
                ]);
                studentManager.addStudent(nameInput.name);
                break;
            case "Enroll Student":
                const courseInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "number",
                        message: "Enter a student ID",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a course name",
                    },
                ]);
                studentManager.enrollStudent(courseInput.studentId, courseInput.course);
                break;
            case "View Student Balance":
                const balanceInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "number",
                        message: "Enter a student ID",
                    },
                ]);
                studentManager.viewStudentBalance(balanceInput.studentId);
                break;
            case "Pay Fees":
                const feesInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "number",
                        message: "Enter a student ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to pay",
                    },
                ]);
                studentManager.payStudentFees(feesInput.studentId, feesInput.amount);
                break;
            case "Show Status":
                const statusInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "number",
                        message: "Enter a student ID",
                    },
                ]);
                studentManager.showStudentStatus(statusInput.studentId);
                break;
            case "Exit":
                console.log("Exiting...");
                process.exit();
        }
    }
}
main();
