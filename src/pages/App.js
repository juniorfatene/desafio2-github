import gitLogo from "../assets/github.png";
import Input from "../components/Input";
import Buttom from "../components/Button";
import { Container } from "./styles";
import ItemRepo from "../components/ItemRepo";
import { useState } from "react";
import { api } from "../services/api";

function App() {

  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () =>{
    const {data} = await api.get(`repos/${currentRepo}`)

    if(data.id){
      const isExist = repos.find(repo => repo.id == data.id);

      if(!isExist){
        setRepos(prev => [...prev, data]);
        setCurrentRepo('');
        return;
      }
    }

    alert('Repositório não encontrado'); 

  }

  const handleRemoveRepo = (id) => {
    const newRepos = repos.filter(repos => repos.id != id);

    setRepos(newRepos);
  }

  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt="GitHub logo"/>
      <Input value={currentRepo} onChange={e => setCurrentRepo(e.target.value)}/>
      <Buttom onClick={handleSearchRepo}/>
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo}/>)}
    </Container>
  );
}

export default App;
