import React , {Component} from 'react';
import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const Post = ({toy} ) => {
 
 
  return (
    
     
       <tbody>

           <tr key ={toy._id}>
             <td>{toy.name}</td>
             <td>{toy.featured}</td>
             <td>{toy.rating}</td>
             <td><button className = "btn btn-link" onClick = {App.deletetoy.bind(this)} >delete</button></td>
           </tr>
       </tbody>
    

  )
 
}
class App extends React.Component{

  constructor(props){
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeRating = this.onChangeRating.bind(this);
    this.onChangeFeatured = this.onChangeFeatured.bind(this);
    this.deletetoy = this.deletetoy.bind(this);
    this.posttoys = this.posttoys.bind(this);


      this.state ={
  
        toyData: [] , 
        name :"" ,
        featured : "",
        rating : ""
      }
    
  }
  
  onChangeName(e)
  {
    this.setState(
      {
        name : e.target.value
      }
    )
  }
  onChangeRating(e)
  {
    this.setState(
      {
        rating : e.target.value
      }
    )
  }
  onChangeFeatured(e)
  {
    this.setState(
      {
        featured : e.target.value
      }
    )
  }
  fetchtoys(){

      fetch('http://localhost:8000/toys')
         .then(res => res.json())
          .then((data => {
            this.setState({toyData : data})
          
          }))
        
        
  }


  posttoys(e){
      e.preventDefault();

      const newtoy = {
           name : this.state.name,
           featured : this.state.featured ,
           rating : this.state.rating
      }

      console.log(newtoy);
      fetch('http://localhost:8000/toys' ,{
         method : "POST",
         mode : "cors" ,
         headers : {
              "Content-Type" : "application/json"
         },
         body : JSON.stringify(newtoy)
      });
      this.fetchtoys();
      this.setState({
        name : "",
        featured : "",
        rating : ""
     })
  
    

      
  }
  deletetoy(id)
  {
    console.log(id);
    fetch('http://localhost:8000/toy' ,{
      method : "DELETE",
      mode : "cors" ,
      headers : {
           "Content-Type" : "application/json"
      },
      body : JSON.stringify({"id": id })
   });
  }
  componentDidMount()
  {
    this.fetchtoys();
  }
 componentDidUpdate()
 {
  
 }
  render(){

    
     
     

   return (
   
   
   <div>
     <h1>fetch-toys</h1>
       <form  onSubmit = {this.posttoys}>
         <label >Name :</label>
         <input className = "form-control" type= "text" value = {this.state.name} onChange = {this.onChangeName.bind(this)}></input>
         <label>Featured : </label>
         <input className = "form-control" type = "text" value = {this.state.featured} onChange ={this.onChangeFeatured.bind(this)}></input>
         <label>Rating : </label>
         <input className = "form-control" type = "text" value = {this.state.rating} onChange = {this.onChangeRating.bind(this)}></input>
         <button type = "submit" className ="btn btn-primary"> Add</button>
       </form>
       <table className = "table table-striped">
      <thead>
        <tr>
          <th>
             Name
          </th>
          <th>
             Featured
          </th>
          <th>
            Rating
          </th>
        </tr>
      </thead>
  
    {this.state.toyData.map((toy, index) => (
    
    <tbody>

    <tr key ={toy._id}>
      <td>{toy.name}</td>
      <td>{toy.featured}</td>
      <td>{toy.rating}</td>
      <td><button className = "btn btn-link" onClick = {() => {this.deletetoy(toy._id)}}>delete</button></td>
    </tr>
     </tbody>
       
    ))}
   
    </table>
    </div>);
   
  }
}


export default App;
