import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  constructor(props){
    super(props);
    this.textInput = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.onChangeTaskName = this.onChangeTaskName.bind(this);
    this.state={
      todo: [],
      task_name :'',
      btnAdd:'Add'
    };
  }

  componentDidMount() {
    this.textInput.current.focus();
  }

  componentDidUpdate(){
    this.textInput.current.focus();
  }

  onChangeTaskName(event){
    this.setState({
      task_name : event.target.value,
    });
  }

  handleReset(event){
    event.preventDefault();
    document.getElementById("lblEdit").value = '';
    this.setState({
      task_name : '',
      btnAdd :'Add',
    });
  }

  handleSubmit(event){
    event.preventDefault();
    if (
      this.state.btnAdd === "Add" &&
      this.state.task_name !== ""
    ) {
      let currentArray = this.state.todo.slice();
      currentArray.push(this.state.task_name);
      this.setState({
        todo: currentArray,
        task_name : '',
        btnAdd :'Add',
      });
    } else if (
      this.state.btnAdd === "Update" &&
      this.state.task_name !== ""
    ) {
      let editIndex = document.getElementById("lblEdit").value;
      let currentArray = this.state.todo.slice();
      currentArray[editIndex] = this.state.task_name;
      this.setState({
        todo: currentArray,
        task_name : '',
        btnAdd :'Add',
      });
    } else {
      alert("enter task");
    }
    
  }

  handleEdit(e) {
    e.preventDefault();
    document.getElementById("lblEdit").value = e.target.value;
    this.setState({
      task_name : this.state.todo[e.target.value],
      btnAdd: "Update"
    });
  }

  handleDelete(e) {
    e.preventDefault();
    let a = this.state.todo.slice();
    a.splice(e.target.value, 1);
    this.setState({
      todo: a,
      task_name : '',
      btnAdd: "Add"
    });
  }


  render(){
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
      <div className="App">
        <h1>Add Task</h1>
        <form id='form1' onSubmit={this.handleSubmit}>
          <input id="txttask" ref={this.textInput} type='text' value={this.state.task_name} onChange={this.onChangeTaskName}></input>
          <input id="btnSubmit" type='submit' value={this.state.btnAdd} className="btn"
          style={{ backgroundColor: "#2196F3" }} ></input>
          <input id="btnReset" type='reset' value='Reset' onClick={this.handleReset} className="btn"
          style={{ backgroundColor: "#f44336" }}></input>
        </form>
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

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
