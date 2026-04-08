// Load students on page load
window.onload = function () {
    displayStudents();
};

// Add Student
function addStudent() {
    let data = {
        name: document.getElementById("name").value.trim(),
        company: document.getElementById("company").value.trim(),
        role: document.getElementById("role").value.trim(),
        status: document.getElementById("status").value
    };

    if (!data.name || !data.company || !data.role) {
        alert("Please fill all fields");
        return;
    }

    let students = JSON.parse(localStorage.getItem("students")) || [];

    students.push(data);

    localStorage.setItem("students", JSON.stringify(students));

    alert("Student Added ✅");

    clearForm();
    displayStudents();
}
