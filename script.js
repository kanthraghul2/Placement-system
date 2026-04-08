function addStudent() {
    let data = {
        name: document.getElementById("name").value,
        company: document.getElementById("company").value,
        role: document.getElementById("role").value,
        status: document.getElementById("status").value
    };

    if (!data.name || !data.company || !data.role) {
        alert("Please fill all fields");
        return;
    }

    fetch("http://localhost:8081/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(() => {
        alert("Saved to Database ✅");
        loadStudents();
    });
}