import React, { useState, useEffect } from "react";
import "../App.css";

function Home() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("expenses"));
    if (data) setExpenses(data);
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const total = expenses.reduce((acc, item) => acc + item.amount, 0);


   const income = expenses
    .filter((item) => item.amount > 0)
    .reduce((acc, item) => acc + item.amount, 0);

  const expense = expenses
    .filter((item) => item.amount < 0)
    .reduce((acc, item) => acc + item.amount, 0);

  const filteredExpenses =
    filter === "All"
      ? expenses
      : expenses.filter((item) => item.category === filter);
  
  
  const addExpense = (e) => {
    e.preventDefault();
    if (!title || !amount || !category) {
        alert("Please fill all fields");
        return;
    }

    const newExpense = {
      id: Date.now(),
      title,
      amount: Number(amount),
      category,
      data:new Date().toLocaleDateString(),
    };

    setExpenses([newExpense, ...expenses]);

    setTitle("");
    setAmount("");
    setCategory("");
  };

  const deleteExpense = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this expense?");
  
    if (confirmDelete) {
        setExpenses(expenses.filter((item) => item.id !== id));
    }
   };


  return (
    <div className="container">
      <h1>💸 Expense Tracker</h1>
      <h2>Total Balance: ₹{total}</h2>
      <h3>Income: ₹{income}</h3>
      <h3>Expense: ₹{expense}</h3>

      <form onSubmit={addExpense} className="form">
        <input
          type="text"
          placeholder="Enter expense..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Enter amount..."
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Category</option>
          <option value="Food"> Food</option>
          <option value="Travel"> Travel</option>
          <option value="Shopping"> Shopping</option>
          <option value="Bills"> Bills</option>
        </select>
        
        <button type="submit">Add</button>
        </form>


        <select value={filter}
        
        onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
        </select>
      
        <ul>
      
            {filteredExpenses.length === 0 ? (
                <p className="empty">No expenses added yet 🚀 Start tracking now! </p>
            ) : (
                filteredExpenses.map((item) => (
                  <li key={item.id}>
                    <div>
                    {item.title} -₹{item.amount} ({item.category})
                    <br />
                          <small style={{ color: "#aaa" }}>{item.date}</small>
                    </div>

                    <button onClick={() => deleteExpense(item.id)}>
                        Delete
                    </button>
                </li>
            ))
        )}
        </ul>
    </div>
  );
}

export default Home;