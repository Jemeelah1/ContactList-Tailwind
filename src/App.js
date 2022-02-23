import useFetch from "react-fetch-hook";
import ContactCards from "./ContactCards";
import {useState} from 'react';
import { useEffect } from "react";

function App() {
  const url = 'https://randomuser.me/api';
  const { isLoading, data, error } = useFetch(url+'?results=200');
  data && console.log(data)
  const [contactList, setContactList] = useState(null)
  const [filterQuery, setFilterQuery] = useState(null)

  useEffect( () => {
    if(filterQuery) {
      const queryString = filterQuery.toLowerCase()
      const filteredData = data?.result?.filter(contact => {
        const fullName = `${contact.name.first} ${contact.name.last}`

        if (queryString.length === 1) {
          const firstLetter = fullName.charAt(0).toLowerCase();
          return firstLetter === queryString
        }
        else {
          return fullName.toLowerCase().includes(queryString)
        }
      })
      setContactList(filteredData)
    }
    else {
      setContactList(data?.results)
    }
  }, [data, filterQuery])
  
  return (
    <div className="bg-gray-300">
      <section>
        <div className="text-align: flex">
          <form>
            <input 
            placeholder="type here to filter..."
            type="text"
            className="ml-20 mt-6 rounded-md p-2"
            onChange={event => setFilterQuery(event.target.value)} />
          </form>
          <button className=" flex justify-center md:justify-end mt-6 bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md p-2 ml-80 "
          isLoading={event => setFilterQuery(event.target.value)}>
              Refresh
          </button>
        </div>
      </section>
      <section className="p-20 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {contactList?.length < 1 && (
          <h1>No data matches your search</h1>
        )}
        {isLoading && (
          <p className="text-center">HOLD On a SeconD !!!</p>
        )}
        {error && (
          <p className="text-center">Oops...error</p>
        )}
        <ContactCards contactList={contactList}/>
      </section>
    </div>
  );
}

export default App;