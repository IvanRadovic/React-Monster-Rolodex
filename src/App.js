import { useState, useEffect } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/searh-box/search-box.component';
import './App.css';

const App = () => {
  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

   const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  }

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => setMonsters(users));
  }, [])

  useEffect( () => {
    const NewfilteredMonsters = monsters.filter((mons) => {
      return mons.name.toLocaleLowerCase().includes(searchField);
      });
      setFilteredMonsters(NewfilteredMonsters);
  },[monsters, searchField])

  return(
      <div className="App">
          <h1 className='app-title'>Monster Rolodex</h1>
          <SearchBox 
            className='monsters-search-box' 
            onChangeHandler={onSearchChange} 
            placeholder='search monsters'
          />
          <CardList monsters={filteredMonsters}  />
      </div>
  )

}


// class App extends Component {
//   constructor(){
//     super();
//     this.state = {
//       monsters:[],
//       searchField:''
//     }
//     // console.log("constructor");
//   }
//   componentDidMount(){
//     // console.log("componentDidMount");
//     fetch("https://jsonplaceholder.typicode.com/users")
//     .then((response) => response.json())
//     .then((users) => this.setState(
//       () => {
//       return {monsters:users}
//       },
//       // () => {console.log(this.state)}
//     ));
//   };

  
//   render(){
//     const {monsters, searchField } = this.state;
//     const {onSearchChange} = this;
    // const filteredMonsters = monsters.filter((mons) => {
    // return mons.name.toLocaleLowerCase().includes(searchField);
    // });

//     return (
//       <div className="App">
//         <h1 className='app-title'>Monster Rolodex</h1>
//         <SearchBox 
//           className='monsters-search-box' 
//           onChangeHandler={onSearchChange} 
//           placeholder='search monsters'
//         />
//         <CardList monsters={filteredMonsters}  />
//       </div>
//     );
//   }
// }

export default App;
