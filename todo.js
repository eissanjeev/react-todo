class App extends React.Component{
  
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      todo :[],
      btnSubmitName : 'Add'
    }
    
  }

  handleReset(e){
    e.preventDefault();
    document.getElementById('lblEdit').value='';
    document.getElementById('txttask').value='';
    this.setState({
      btnSubmitName : 'Add'
    })
  }

handleClick(e){
  e.preventDefault();
  if(this.state.btnSubmitName === 'Add' && (document.getElementById('txttask').value != '')){
    let a = this.state.todo.slice();
    a.push(document.getElementById('txttask').value)
    this.setState({
      todo : a
    });
  }
  else  if(this.state.btnSubmitName === 'Update' && (document.getElementById('txttask').value != '')){
    let editIndex = document.getElementById('lblEdit').value;
    let a = this.state.todo.slice();
    a[editIndex] = document.getElementById('txttask').value;
    this.setState({
      todo : a,
      btnSubmitName : 'Add'
    });
  }
  else{
    alert('enter task');
  }
  document.getElementById('txttask').value='';
}
  
 handleEdit(e){
  e.preventDefault();
  document.getElementById('txttask').value=this.state.todo[e.target.value];
  document.getElementById('lblEdit').value=e.target.value;
  this.setState({
    btnSubmitName : 'Update',
  })
  
}
  
  handleDelete(e){
  e.preventDefault();
  let a = this.state.todo.slice();
  a.splice(e.target.value , 1)
  this.setState({
    todo : a
  });
  document.getElementById('txttask').value='';
}


  render(){
    const renderList = this.state.todo.map(
      (item , i) => (
        <li>
          {item}
          <button value={i} onClick={this.handleEdit.bind(this)}>Edit</button>
          <button value={i} onClick={this.handleDelete.bind(this)}>Delete</button>
        </li>
      )
    );
     return (
       <div>
         <input Id='txttask'   / >
         <button Id='btnSubmit' onClick={this.handleClick}>{this.state.btnSubmitName}</button>
           <button Id='btnReset' onClick={this.handleReset}>Reset</button>
           <label Id='lblEdit'></label>
           <ul>
             {renderList}
           </ul>
           
           
       </div>
     );
  }
 
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
