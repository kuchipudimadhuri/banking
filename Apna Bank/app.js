// FRONTEND-ONLY VERSION (No backend needed)

// Dummy user data for frontend demo
const dummyUser = {
  username: "user",
  password: "1234",
  balance: 10000,
  transactions: [
    { date: "2025-08-19", type: "Deposit", amount: 5000 },
    { date: "2025-08-18", type: "Transfer", amount: 2000 },
    { date: "2025-08-17", type: "Withdrawal", amount: 1500 }
  ],
  cards: "Visa Debit **** 4321",
  loan: "No active loans"
};

// LOGIN HANDLER
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === dummyUser.username && password === dummyUser.password) {
      localStorage.setItem("username", username);
      window.location.href = "dashboard.html";
    } else {
      document.getElementById("error").innerText = "Invalid Username or Password";
    }
  });
}

// DASHBOARD HANDLERS
if (window.location.pathname.endsWith("dashboard.html")) {
  const userName = localStorage.getItem("username");
  const userNameEl = document.getElementById("userName");

  if (userName && userNameEl) {
    userNameEl.innerText = userName;

    // Show Balance
    document.getElementById("balance").innerText = `₹ ${dummyUser.balance}`;

    // Show Transactions
    const list = document.getElementById("transactions");
    list.innerHTML = "";
    dummyUser.transactions.forEach(tx => {
      const li = document.createElement("li");
      li.innerText = `${tx.date} - ${tx.type}: ₹${tx.amount}`;
      list.appendChild(li);
    });

    // Show Loan Status
    document.getElementById("loanStatus").innerText = dummyUser.loan;

    // Show Card Info
    document.getElementById("cardInfo").innerText = dummyUser.cards;

    // Transfer Money (just reduces balance and logs transaction)
    const transferForm = document.getElementById("transferForm");
    if (transferForm) {
      transferForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const toUser = document.getElementById("toUser").value;
        const amount = parseFloat(document.getElementById("amount").value);

        if (amount > 0 && amount <= dummyUser.balance) {
          dummyUser.balance -= amount;
          dummyUser.transactions.unshift({
            date: new Date().toISOString().split("T")[0],
            type: `Transfer to ${toUser}`,
            amount
          });
          alert("Transfer successful!");
          location.reload();
        } else {
          alert("Insufficient balance or invalid amount.");
        }
      });
    }

    // Deposit Money
    const depositForm = document.getElementById("depositForm");
    if (depositForm) {
      depositForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const depositAmount = parseFloat(document.getElementById("depositAmount").value);

        if (depositAmount > 0) {
          dummyUser.balance += depositAmount;
          dummyUser.transactions.unshift({
            date: new Date().toISOString().split("T")[0],
            type: "Deposit",
            amount: depositAmount
          });
          alert("Deposit successful!");
          location.reload();
        } else {
          alert("Invalid deposit amount.");
        }
      });
    }

    // Logout
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.clear();
        window.location.href = "index.html";
      });
    }
  }
}
