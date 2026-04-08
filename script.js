// Load data when page opens
window.onload = function () {
    displayStudents();
};

// Add Student
function addStudent() {
    let name = document.getElementById("name").value.trim();
    let company = document.getElementById("company").value.trim();
    let role = document.getElementById("role").value.trim();
    let status = document.getElementById("status").value;

    if (!name || !company || !role) {
        alert("Please fill all fields");
        return;
    }

    let students = JSON.parse(localStorage.getItem("students")) || [];

    let newStudent = {
        name: name,
        company: company,
        role: role,
        status: status
    };

    students.push(newStudent);

    localStorage.setItem("students", JSON.stringify(students));

    alert("Student Added ✅");

    clearForm();

    // Force refresh UI
    displayStudents();
}

// Display Students
function displayStudents() {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let list = document.getElementById("studentList");

    list.innerHTML = "";

    if (students.length === 0) {
        list.innerHTML = `<tr><td colspan="5">No data found</td></tr>`;
        return;
    }

    students.forEach((student, index) => {
        let statusClass = student.status === "Placed" ? "placed" : "notPlaced";

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.company}</td>
            <td>${student.role}</td>
            <td><span class="${statusClass}">${student.status}</span></td>
            <td>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;

        list.appendChild(row);
    });
}

// Delete Student
function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem("students")) || [];

    if (confirm("Are you sure you want to delete?")) {
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        displayStudents();
    }
}

// Search Student
function searchStudent() {
    let input = document.getElementById("search").value.toLowerCase();
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let list = document.getElementById("studentList");

    list.innerHTML = "";

    let filtered = students.filter(student =>
        student.name.toLowerCase().includes(input)
    );

    if (filtered.length === 0) {
        list.innerHTML = `<tr><td colspan="5">No matching result</td></tr>`;
        return;
    }

    filtered.forEach((student, index) => {
        let statusClass = student.status === "Placed" ? "placed" : "notPlaced";

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.company}</td>
            <td>${student.role}</td>
            <td><span class="${statusClass}">${student.status}</span></td>
            <td>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;

        list.appendChild(row);
    });
}

// Clear form
function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("company").value = "";
    document.getElementById("role").value = "";
    document.getElementById("status").value = "Placed";
}
