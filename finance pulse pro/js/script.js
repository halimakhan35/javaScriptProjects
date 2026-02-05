let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let myChart;

// DOM ELEMENTS
const toggleSwitch = document.querySelector("#checkbox");
const expenseForm = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const totalDisplay = document.getElementById("total-amount");
const filterSelect = document.getElementById("filter-category");
const exportBtn = document.getElementById("export-btn");
const ctx = document.getElementById("expenseChart").getContext("2d");

// THEME TOGGLE
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (currentTheme === "dark") toggleSwitch.checked = true;
}

toggleSwitch.addEventListener("change", (e) => {
  const theme = e.target.checked ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  updateChart();
});

// CSV EXPORT LOGIC
exportBtn.addEventListener("click", () => {
  if (expenses.length === 0) return alert("No data to export!");

  // Create CSV Header
  let csvContent = "data:text/csv;charset=utf-8,Description,Amount,Category\n";

  // Add Data Rows
  expenses.forEach((e) => {
    csvContent += `${e.desc},${e.amount},${e.category}\n`;
  });

  // Create hidden download link
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "my_expenses.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

// CORE APP FUNCTIONS
function updateChart() {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const categories = ["Food", "Rent", "Fun", "Other"];
  const data = categories.map((cat) =>
    expenses
      .filter((e) => e.category === cat)
      .reduce((s, e) => s + e.amount, 0),
  );

  if (myChart) myChart.destroy();
  myChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: categories,
      datasets: [
        {
          data,
          backgroundColor: ["#fbbf24", "#f87171", "#60a5fa", "#a78bfa"],
          borderColor: isDark ? "#1e293b" : "#fff",
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: isDark ? "#f8fafc" : "#1e293b" } },
      },
    },
  });
}

function updateUI() {
  const filter = filterSelect.value;
  expenseList.innerHTML = "";

  const filtered =
    filter === "All" ? expenses : expenses.filter((e) => e.category === filter);

  filtered.forEach((exp, index) => {
    const li = document.createElement("li");
    li.className = "expense-item";
    li.innerHTML = `
            <span><strong>${exp.desc}</strong> (${exp.category})</span>
            <span>$${exp.amount.toFixed(2)} <button class="delete-btn" onclick="deleteItem(${index})">✕</button></span>
        `;
    expenseList.appendChild(li);
  });

  const total = filtered.reduce((sum, exp) => sum + exp.amount, 0);
  totalDisplay.innerText = `$${total.toFixed(2)}`;
  localStorage.setItem("expenses", JSON.stringify(expenses));
  updateChart();
}

expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  expenses.push({
    desc: document.getElementById("desc").value,
    amount: parseFloat(document.getElementById("amount").value),
    category: document.getElementById("category").value,
  });
  expenseForm.reset();
  updateUI();
});

function deleteItem(index) {
  expenses.splice(index, 1);
  updateUI();
}

filterSelect.addEventListener("change", updateUI);
document.getElementById("clear-btn").addEventListener("click", () => {
  if (confirm("Delete all data?")) {
    expenses = [];
    updateUI();
  }
});

updateUI();
