import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import axios from 'axios';

var test = "NOT WORKING";

function ClientList() {
    const [result, setResult] = useState([]);
    const [URL, setURL] = useState({
      summary_id: "",
      client: "",
      path: "",
    });

  function deleteClient(client, e) {
    e.preventDefault();
    console.log(client);
    axios.put("http://localhost:8080/clients/delete", client)
    window.location.reload();
  }

  function updatePath(client, e) {
    e.preventDefault();
    setURL({
      summary_id: client.client_id,
      client: client,
      path: e.target.value,
    })
  }

  function updateSummary() {
    console.log("added summary?")
    axios.post("http://localhost:8080/summary/RegisterSummary/", URL)
  }

   const getUsers = async () => {
      const response = await Axios("http://localhost:8080/clients/allClients");
      setResult(response.data);
        //console.log(list)
    }

  useEffect( () => {
    console.log(result);
  }, [result])

  useEffect( () => {
    getUsers();
  }, [])

    return (
        <div>
          {console.log(URL)}
            {result&&result.map(client => {
              return (
                <form>
                <table>
                    <tbody>
                      <tr>
                        <th>Client Name</th>
                        <th>Client Email</th>
                        <th>Delete Client</th>
                        <th>Insert Summary</th>
                        <th>Submit</th>
                      </tr>
                      <tr>
                      <td key={client.client_id}>{client.first_name + " " +  client.last_name}</td>
                      <td>{client.email}</td>
                      <td><button onClick={(e) => deleteClient(client, e)}>Delete Client</button></td>
                      <td><input type="text" onChange={(e) => updatePath(client, e)}/></td>
                      <td><input type="button" value="Update Summary" onClick={(e) => updateSummary(e)}/></td>
                  </tr>
                  </tbody>
                </table>
                </form>
              )
            })}
        </div>
    )
}
export default ClientList