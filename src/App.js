import './App.css';
import {useEffect, useState} from 'react';

function App() {
  
  const [hasStarted, setHasStarted] = useState(false)
  const [currentTab, setCurrentTab] = useState("register")
  const [cats, setCats] = useState([])
  const [filteredCats, setFilteredCats] = useState([])
  const [filterMonth, setFilterMonth] = useState('Todos')
  const [isSuccess, setIsSuccess] = useState(false)

  const registerForm = (e) => {
    e.preventDefault();
    const newCats = cats.concat({
      mes: e.target.mes.value,
      recebidos: e.target.recebidos.value,
      atendidos: e.target.atendidos.value,
      id: cats.length
    })
    setCats(newCats)

    setIsSuccess(true)

    setTimeout(() => {
      setIsSuccess(false)
    }, 4000)
  }

  const handleFilter = (e) => {
    e.preventDefault();
    const selectedMonth = e.target.value;
    setFilterMonth(selectedMonth);
    if(selectedMonth === 'Todos') {
      setFilteredCats(cats)
    } else {
      setFilteredCats(cats.filter(cat => cat.mes === selectedMonth))
    }
  }
  

  useEffect(() => {
    if(currentTab === 'read') {
      setFilteredCats(cats)
    }
  }, [currentTab, cats])

  return (
    <div className="App">
      {!hasStarted &&
        <div className="initRegister">
            <img alt="Corpo socorrido na rua" src="https://www.lawdonut.co.uk/business/sites/lawdonut-business/files/dealingwithanaccident_157411556.jpg"></img>
            <h1>
                Bem vindo ao registrador de acidentes!
            </h1>
            <button className='mainButton' onClick={() => setHasStarted(true)}>Iniciar</button>
        </div>  
      }
      
      {hasStarted &&
          <div className='loggedApp'>
            <h1>Gerenciador de Ocorrências</h1>
            <div className='tabMenu'>
                <button className={`${currentTab === 'register' ? 'tab tab--active' : 'tab'}`} onClick={() => setCurrentTab("register")}>Cadastrar Ocorrência</button>
                <button className={`${currentTab === 'read' ? 'tab tab--active' : 'tab'}`} onClick={() => setCurrentTab("read")}>Ver Ocorrências</button>
                <button className="logout" onClick={() => setHasStarted(false)}>Sair</button>
            </div>
            <div className='tabContainer'>
              {currentTab === 'register' ? 
                <div className='tabContent'>
                  <h2>Cadastre uma nova ocorrência</h2>
                  <form onSubmit={registerForm}>
                      <label for="mes">
                          Mês
                          <select name="mes">
                              <option>Janeiro</option>
                              <option>Fevereiro</option>
                              <option>Março</option>
                              <option>Abril</option>
                              <option>Maio</option>
                              <option>Junho</option>
                              <option>Julho</option>
                              <option>Agosto</option>
                              <option>Setembro</option>
                              <option>Outubro</option>
                              <option>Novembro</option>
                              <option>Dezembro</option>
                          </select>
                      </label>
                      <label for="recebidos">
                        Número de Chamados Recebidos
                        <input name="recebidos" type="number" placeholder='0'></input>
                      </label>
                      <label for="atendidos">
                        Número de Chamados Atendidos
                        <input name="atendidos" type="number" placeholder='0'></input>
                      </label>
                      <button className='mainButton'>Registrar</button>
                  </form>
                  {isSuccess && <p className='successMessage'>Acidente registrado com sucesso</p>}
                </div>
                : 

                <div className='tabContent'>
                  <h2>Visualizar Chamados</h2>
                  <select onChange={(e) => {handleFilter(e)}} name="mes">
                        <option>Todos</option>
                        <option>Janeiro</option>
                        <option>Fevereiro</option>
                        <option>Março</option>
                        <option>Abril</option>
                        <option>Maio</option>
                        <option>Junho</option>
                        <option>Julho</option>
                        <option>Agosto</option>
                        <option>Setembro</option>
                        <option>Outubro</option>
                        <option>Novembro</option>
                        <option>Dezembro</option>
                    </select>

                    <div className='filteredCats'>
                      {filteredCats.map(cat => 
                          <div className='catLine'>
                            <p>Mês: {cat.mes}</p>
                            <p>Recebidos: {cat.recebidos}</p>
                            <p>Atendidos: {cat.atendidos}</p>
                          </div>    
                      )}
                    </div>
                </div>
              }
            </div>

          </div>  
      }

    </div>
  );
}

export default App;
