import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isShowUser, setIsShowUser] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [idUser, setIdUser] = useState(0);
  
  useEffect(() => {
    if(isLoading){
      if(!isShowUser){
        fetch('https://reqres.in/api/users').then((response) => response.json())
        .then((response) => {
          response.data.forEach(user => {
            users.push(user);
          });
          setIsLoading(false);
        }); 
      }
    }
  });

  useEffect(() => {
    if(isShowUser){
      if(idUser > 0){
        fetch('https://reqres.in/api/users/'+idUser).then((response) => response.json())
        .then((response) => {
          const data = response.data;
          setUser(data);
        });
      }
    }
  }, [isShowUser]);

  const showUser = function(id) {
    setUsers([]);
    setIsShowUser(true);
    setIdUser(id);
  };

  const goBack = function() {
    setUser([]);
    setIsLoading(true);
    setIsShowUser(false);
  };

  return isLoading ? (
    <div className="App">
      <div className="App-header">
        Cargando...
      </div>
    </div>
  ) : isShowUser ? 
  (
    <div className="App">
      <div className="App-arrow">
        <img src={'https://img.icons8.com/flat-round/64/000000/arrow-left.png'} alt="go-back" onClick={goBack} />
      </div>
      <div className="App-header">
        <div className="row">
          <div className="col-lg-12">
            <center>
            <table>
              <tbody>
                <tr key={user.id}>
                  <td className="col-lg-3">
                    <img src={user.avatar} alt="avatar" />
                  </td>
                  <td className="col-lg-3">
                    <label>{user.first_name}</label>
                  </td>
                  <td className="col-lg-3">
                    <label>{user.last_name}</label>
                  </td>
                  <td className="col-lg-3">
                    <label>{user.email}</label>
                  </td>
                </tr>
              </tbody>
            </table>
            </center>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="App">
      <div className="App-container">
        <div className="row">
          <div className="col-lg-12">
            <center>
            <table>
              <tbody>
              {users.map((user) => {
              return <tr key={user.id}>
                  <td className="col-md-6">
                    <img src={user.avatar} alt="avatar" />
                  </td>
                  <td className="col-md-4">
                    <label>{user.first_name}</label>
                  </td>
                  <td className="col-lg-2">
                    <button type="button" className="btn btn-success" onClick={() => showUser(user.id)}>
                      Ver más
                    </button>
                  </td>
                </tr>
              })}
              </tbody>
            </table>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
