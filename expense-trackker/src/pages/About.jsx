function About() {
  return (
    <div style={{ padding: "40px", textAlign: "center", color: "white" }}>
      <h1>About This Project</h1>
      <p>
        This Expense Tracker is built using React.
        It helps users track their daily expenses,
        categorize spending, and manage their budget efficiently.
      </p>

      <p><b>Features:</b></p>
      <ul style={{ listStyle: "none" }}>
        <li>✔ Add & delete expenses</li>
        <li>✔ Category filtering</li>
        <li>✔ Income & expense calculation</li>
        <li>✔ Data saved using Local Storage</li>
        <li>✔ Routing using React Router</li>
      </ul>
    </div>
  );
}

export default About;