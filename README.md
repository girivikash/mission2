# 💰 Cash Flow Tracker

A lightweight, browser-based financial dashboard designed to help users monitor their monthly income, track expenses in real-time, and visualize their spending habits using interactive charts.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Version: 1.0.0](https://img.shields.io/badge/Version-1.0.0-blue.svg)

## 🚀 Features

- **Income Management**: Set and update your total monthly salary.
- **Expense Tracking**: Add expenses with a name and amount to see an instant breakdown.
- **Live Dashboard**: Automatically calculates Total Salary, Total Expenses, and Remaining Balance.
- **Visual Analytics**: Interactive Donut Chart powered by `Chart.js` to visualize the ratio of "Spent" vs "Remaining".
- **Data Persistence**: Uses `localStorage` to save your data—your information remains even after refreshing the page.
- **Smart UI**: The balance color changes to **Red** if you overspend and **Green** if you are within budget.
- **Responsive Design**: Fully functional on desktops, tablets, and mobile devices.

## 🛠️ Built With

* **HTML5**: Semantic structure.
* **CSS3**: Custom properties (variables) and Grid/Flexbox layout.
* **JavaScript (ES6+)**: State management and DOM manipulation.
* **Chart.js**: For high-performance data visualization.

## 📂 Project Structure

```text
Cash-Flow-Tracker/
│
├── index.html    # The UI structure and library links
├── style.css     # Modern dashboard styling and responsiveness
├── script.js    # Application logic, calculation, and chart rendering
└── README.md     # Project documentation
