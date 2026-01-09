const API = "http://localhost:3000/students";

function loadStudents() {
    fetch(API)
        .then(res => res.json())
        .then(data => {
            let rows = "";
            data.forEach(s => {
                rows += `
                <tr>
                    <td>${s.id}</td>
                    <td>${s.name}</td>
                    <td>${s.department}</td>
                    <td><button onclick="deleteStudent(${s.id})">Delete</button></td>
                </tr>`;
            });
            document.getElementById("data").innerHTML = rows;
        });
}

function addStudent() {
    fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: document.getElementById("name").value,
            department: document.getElementById("dept").value
        })
    }).then(loadStudents);
}

function deleteStudent(id) {
    fetch(`${API}/${id}`, { method: "DELETE" })
        .then(loadStudents);
}

loadStudents();
