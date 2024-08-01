let selectedEmployee;
let employeesData = [
    { name: "Maheesh", photo: "mahesh.jpg", services: [], phone: "123-456-7890" },
    { name: "Prakash", photo: "haa.jpg", services: [], phone: "098-765-4321" },
    { name: "Chandru", photo: "chandru.jpg", services: [], phone: "555-555-5555" }
];
let currentPanel;

function showPanel(panel) {
    currentPanel = panel;
    document.getElementById("loginPanel").style.display = "block";
    document.getElementById("signupPanel").style.display = "none";
    document.getElementById("ownerPanel").style.display = "none";
    document.getElementById("employeePanel").style.display = "none";
    document.getElementById("customerPanel").style.display = "none";

    // Clear the login form fields
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}

function showSignupPanel() {
    document.getElementById("loginPanel").style.display = "none";
    document.getElementById("signupPanel").style.display = "block";
}

function showLoginPanel() {
    document.getElementById("signupPanel").style.display = "none";
    document.getElementById("loginPanel").style.display = "block";
}

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    // Implement actual login logic here
    if (username === "admin" && password === "admin" && currentPanel === "owner") {
        showOwnerPanel();
    } else if (username === "employee" && password === "employee" && currentPanel === "employee") {
        showEmployeePanel();
    } else if (username === "customer" && password === "customer" && currentPanel === "customer") {
        showCustomerPanel();
    } else {
        alert("Invalid credentials!");
    }
}

function signup() {
    const username = document.getElementById("signupUsername").value;
    const password = document.getElementById("signupPassword").value;
    const phone = document.getElementById("signupPhone").value;

    // Implement actual signup logic here
    if (username && password && phone) {
        employeesData.push({ name: username, photo: "default.jpg", services: [], phone: phone });
        alert("Signup successful!");
        showLoginPanel();
    } else {
        alert("Please fill in all fields!");
    }
}

function showOwnerPanel() {
    document.getElementById("loginPanel").style.display = "none";
    document.getElementById("ownerPanel").style.display = "block";
    calculateTotalRevenue();
}

function showEmployeePanel() {
    document.getElementById("loginPanel").style.display = "none";
    document.getElementById("employeePanel").style.display = "block";
    const employeesDiv = document.getElementById("employees");
    employeesDiv.innerHTML = "";
    employeesData.forEach(employee => {
        const employeeDiv = document.createElement("div");
        employeeDiv.classList.add("employee");
        employeeDiv.innerHTML = `
            <img src="${employee.photo}" alt="${employee.name}">
            <p>${employee.name}</p>
            <p>${employee.phone}</p>
        `;
        employeeDiv.addEventListener("click", () => {
            selectedEmployee = employee;
            document.getElementById("services").style.display = "block";
        });
        employeesDiv.appendChild(employeeDiv);
    });
}

function showCustomerPanel() {
    document.getElementById("loginPanel").style.display = "none";
    document.getElementById("customerPanel").style.display = "block";
}

function calculateTotal() {
    const services = document.querySelectorAll("#services input[type='checkbox']:checked");
    let total = 0;
    services.forEach(service => {
        total += parseInt(service.value);
    });
    const commission = calculateCommission(total);
    const summaryDiv = document.getElementById("summary");
    summaryDiv.innerHTML = `
        <h3>Summary for ${selectedEmployee.name}</h3>
        <p>Total Amount: ${total} rupees</p>
        <p>Commission: ${commission} rupees</p>
    `;
    summaryDiv.style.display = "block";

    // Add the services to the selected employee's data
    selectedEmployee.services = Array.from(services).map(service => service.nextElementSibling.innerText);
}

function calculateCustomerTotal() {
    const services = document.querySelectorAll("#customerServices input[type='checkbox']:checked");
    let total = 0;
    services.forEach(service => {
        total += parseInt(service.value);
    });
    const summaryDiv = document.getElementById("customerSummary");
    summaryDiv.innerHTML = `
        <h3>Summary</h3>
        <p>Total Amount: ${total} rupees</p>
    `;
    summaryDiv.style.display = "block";
}

function calculateCommission(total) {
    if (total <= 1000) return total * 0.1;
    else if (total <= 1500) return total * 0.15;
    else return total * 0.2;
}

function processPayment() {
    const paymentAmount = document.getElementById("paymentAmount").value;
    alert(`Payment of ${paymentAmount} rupees successful!`);
}

function calculateTotalRevenue() {
    let totalRevenue = 0;
    employeesData.forEach(employee => {
        employee.services.forEach(service => {
            if (service === "Haircut") totalRevenue += 100;
            else if (service === "Beard Trim") totalRevenue += 100;
            else if (service === "Facial") totalRevenue += 1200;
            else if (service === "Hair Spa") totalRevenue += 1500;
        });
    });
    document.getElementById("revenue").innerHTML = `
        <h3>Total Revenue</h3>
        <p>${totalRevenue} rupees</p>
    `;
}
