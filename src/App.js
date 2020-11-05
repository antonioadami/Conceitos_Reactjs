import React, { useState, useEffect } from "react";
import api from "./services/api"

import "./styles.css";

function App() {
    const [repositories, setRepository] = useState([]);

    useEffect(() => {
        api.get('repositories').then(res => {
            setRepository(res.data);
        })
    }, []);

    async function handleAddRepository() {
        api.post('repositories', {
            title: `Repo - ${Date.now()}`,
            url: "www.com.br",
            techs: [
                "reactjs",
                "javascript"
            ]
        }).then(res => {
            setRepository([...repositories, res.data]);
        })
    }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(res => {
        const newRepositories = repositories.filter(repo => repo.id !== id)
        setRepository(newRepositories);
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => 
            <li key={repo.id} >
                {repo.title}
                <button onClick={() => handleRemoveRepository(repo.id)}>
                    Remover
                </button>
            </li> 
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
