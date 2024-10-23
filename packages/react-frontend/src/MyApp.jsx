import React, {useState, useEffect} from "react";
import Table from "./Table";
import Form from "./Form"



  
  function MyApp() {
    const [characters, setCharacters] = useState([]);

    function removeOneCharacter(index){
        const updated = characters.filter((character, i) =>{
            return i !==index;

        });
        // returns the user to delete based on the index. 
        //can pass in the id through here
        const userToDelete = characters.find((character,i)=> 
        {
          return i===index; 
        }
        
        );
        console.log(userToDelete);

        deleteUser(userToDelete)
        .then((res) => {if (res.status===204){
          return res
        }
        
        })
        .catch((error) => {
        console.log(error);
        });


        


        //we have the index of the object, so look to get the ID of that 
        //index then pass that through the url delete method using 
        //the specified description 

        setCharacters(updated);

    
    }
    function updateList(person) {
    postUser(person)
    .then((res) => {if (res.status ===201)
      {
        return res.json();
        }})
        .then((newPerson) => 
        {if(newPerson) 
          {
            setCharacters([...characters, newPerson]);
            }})
    .catch((error) => {
      console.log(error);
    });
}

    function fetchUsers() {
      const promise = fetch("http://localhost:8000/users");
      return promise;
    }

    useEffect(()=> {
      fetchUsers().then((res)=> res.json())
      .then((json)=> setCharacters(json["users_list"]))
      .catch((error)=> {
        console.log(error);
        
      });
    
    
    
    }, []);

    function postUser(person){
      const promise = fetch("Http://localhost:8000/users", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(person)
          })
      return promise ;
    }


    function deleteUser(person)
    {
      const id = person["_id"];
      const promise = fetch(`Http://localhost:8000/users/${id}`, {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"},
        
          });
      return promise ;
    
    }
  
    return (
        <div className="container">
    <Table
      characterData={characters}
      removeCharacter={removeOneCharacter}
    />
        <Form handleSubmit={updateList} />
  </div>
        )
    }
export default MyApp;