/* =========================
   LOGIN
========================= */

// ================= LOGIN =================

let loginButton = document.getElementById("loginBtn");

if (loginButton) {

    loginButton.onclick = function () {

        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let message = document.getElementById("message");

        fetch("users.xml")
            .then(function(response) {
                return response.text();
            })

            .then(function(data) {

                let parser = new DOMParser();

                let xml = parser.parseFromString(data, "text/xml");

                let users = xml.getElementsByTagName("user");

                let found = false;

                for (let i = 0; i < users.length; i++) {

                    let xmlUsername =
                        users[i].getElementsByTagName("username")[0].textContent;

                    let xmlPassword =
                        users[i].getElementsByTagName("password")[0].textContent;

                    if (username === xmlUsername &&
                        password === xmlPassword) {

                        found = true;
                        break;
                    }
                }

                if (found) {

                    message.innerHTML = "Login successful!";

                    window.location.href = "portal.html";

                } else {

                    message.innerHTML = "Invalid username or password.";

                }

            })

            .catch(function(error) {

                console.log("Error:", error);
                message.innerHTML = "Error loading login data.";

            });
    };
}


// ================= STUDENT DATA =================

if (document.getElementById("studentTable")) {

    fetch("students.xml")

        .then(function(response) {
            return response.text();
        })

        .then(function(data) {

            let parser = new DOMParser();

            let xml = parser.parseFromString(data, "text/xml");

            let students = xml.getElementsByTagName("student");

            let table = document.getElementById("studentTable");

            let highestMarks = 0;

            let topStudentName = "";

            for (let i = 0; i < students.length; i++) {

                let name =
                    students[i].getElementsByTagName("name")[0].textContent;

                let course =
                    students[i].getElementsByTagName("course")[0].textContent;

                let semester =
                    students[i].getElementsByTagName("semester")[0].textContent;

                let marks =
                    Number(
                        students[i].getElementsByTagName("marks")[0].textContent
                    );


                // Find Top Student

                if (marks > highestMarks) {

                    highestMarks = marks;

                    topStudentName = name;

                }


                // Create table row

                let row = document.createElement("tr");


                // Name cell

                let nameCell = document.createElement("td");

                nameCell.innerHTML = name;


                // Course cell

                let courseCell = document.createElement("td");

                courseCell.innerHTML = course;


                // Semester cell

                let semesterCell = document.createElement("td");

                semesterCell.innerHTML = semester;


                // Marks cell

                let marksCell = document.createElement("td");

                marksCell.innerHTML = marks;


                // Add cells to row

                row.appendChild(nameCell);

                row.appendChild(courseCell);

                row.appendChild(semesterCell);

                row.appendChild(marksCell);


                // Add row to table

                table.appendChild(row);

            }


            // Show Top Student

            document.getElementById("topStudent").innerHTML =
                topStudentName + " - " + highestMarks + " marks";

        })

        .catch(function(error) {

            console.log("Error:", error);

        });

}


// ================= HIDE / SHOW TABLE =================

function toggleTable() {

    let table = document.getElementById("tableContainer");

    let button = document.getElementById("tableButton");


    if (table.style.display === "none") {

        table.style.display = "block";

        button.innerHTML = "Hide Student Table";

    } else {

        table.style.display = "none";

        button.innerHTML = "Show Student Table";

    }

}


// ================= CHANGE HEADING =================

function changeHeading() {

    let heading = document.getElementById("heading");

    heading.innerHTML = "Welcome to Anvi's Student Portal!";

}


// ================= LIGHT / DARK MODE =================

function toggleMode() {

    document.body.classList.toggle("dark-mode");

}