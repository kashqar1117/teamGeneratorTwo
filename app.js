const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

const menuQ = {
  type: "list",
  name: "title",
  message: "what is the title?",
  choices: ["engineer", "intern", "manager", "fin"],
};

const EmployeeQ = [
  {
    type: "input",
    name: "name",
    message: "What is the employees name?",
  },
  {
    type: "input",
    name: "email",
    message: "Write their email.",
  },

  {
    type: "id",
    name: "id",
    message: "Enter in id.",
  },
];

const mangerQ = [
  ...EmployeeQ,
  {
    type: "input",
    name: "officeNumber",
    message: "Whats their office number?",
  },
];

const engineerQ = [
  ...EmployeeQ,
  {
    type: "github",
    name: "github",
    message: "github link?",
  },
];
const internQ = [
  ...EmployeeQ,
  {
    type: "input",
    name: "school",
    message: "Whats their school?",
  },
];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
// ["engineer", "intern", "manager", "fin"],
function menu() {
  inquirer.prompt(menuQ).then((ans) => {
    if (ans.title === "manager") {
      getManager();
    } else if (ans.title === "engineer") {
      getEngineer();
    } else if (ans.title === "intern") {
      getIntern();
    } else {
      fin();
    }
  });
}
function getManager() {
  inquirer.prompt(mangerQ).then((ans) => {
    const emp = new Manager(ans.name, ans.id, ans.email, ans.officeNumber);
    employees.push(emp);
    menu();
  });
}
function getEngineer() {
  inquirer.prompt(engineerQ).then((ans) => {
    const emp = new Engineer(ans.name, ans.id, ans.email, ans.github);
    employees.push(emp);
    menu();
  });
}
function getIntern() {
  inquirer.prompt(internQ).then((ans) => {
    const emp = new Intern(ans.name, ans.id, ans.email, ans.school);
    employees.push(emp);
    menu();
  });
}
function fin() {
  const markdown = render(employees);

  //writes to file
  fs.writeFile("./dist/team.html", markdown, (err) => {
    if (err) throw err;
    console.log("Thank you!");
  });
}

console.log("welcome");
menu();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
