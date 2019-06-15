import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      todo: [],
      btnSubmitName: "Add"
    };
  }

  handleReset(e) {
    e.preventDefault();
    document.getElementById("lblEdit").value = "";
    document.getElementById("txttask").value = "";
    this.setState({
      btnSubmitName: "Add"
    });
  }

  handleClick(e) {
    e.preventDefault();
    if (
      this.state.btnSubmitName === "Add" &&
      document.getElementById("txttask").value !== ""
    ) {
      let a = this.state.todo.slice();
      a.push(document.getElementById("txttask").value);
      this.setState({
        todo: a
      });
    } else if (
      this.state.btnSubmitName === "Update" &&
      document.getElementById("txttask").value !== ""
    ) {
      let editIndex = document.getElementById("lblEdit").value;
      let a = this.state.todo.slice();
      a[editIndex] = document.getElementById("txttask").value;
      this.setState({
        todo: a,
        btnSubmitName: "Add"
      });
    } else {
      alert("enter task");
    }
    document.getElementById("txttask").value = "";
  }

  handleEdit(e) {
    e.preventDefault();
    document.getElementById("txttask").value = this.state.todo[e.target.value];
    document.getElementById("lblEdit").value = e.target.value;
    this.setState({
      btnSubmitName: "Update"
    });
  }

  handleDelete(e) {
    e.preventDefault();
    let a = this.state.todo.slice();
    a.splice(e.target.value, 1);
    this.setState({
      todo: a,
      btnSubmitName: "Add"
    });
    document.getElementById("txttask").value = "";
  }

  render() {
    const renderList = this.state.todo.map((item, i) => (
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{item}</td>
        <td>
          <button
            value={i}
            style={{ backgroundColor: "#4CAF50", color: "#ffffff" }}
            onClick={this.handleEdit.bind(this)}
          >
            Edit
          </button>
        </td>
        <td>
          <button
            value={i}
            style={{ backgroundColor: "#f44336", color: "#ffffff" }}
            onClick={this.handleDelete.bind(this)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div id="root">
        <h1>Add Task</h1>
        <input id="txttask" />
        <button
          id="btnSubmit"
          className="btn"
          style={{ backgroundColor: "#2196F3" }}
          onClick={this.handleClick}
        >
          {this.state.btnSubmitName}
        </button>
        <button
          id="btnReset"
          style={{ backgroundColor: "#f44336" }}
          className="btn"
          onClick={this.handleReset}
        >
          Reset
        </button>
        <label id="lblEdit" />
        <br />
        <hr />
        <table style={{ border: "2px solid red" }}>
          <thead>
            <tr>
              <td>Sr No.</td>
              <td>Task</td>
              <td>Action</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>{renderList}</tbody>
        </table>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
