import './App.css';
import {useEffect, useState} from 'react';

function App() {
  
  const [hasStarted, setHasStarted] = useState(false)
  const [currentTab, setCurrentTab] = useState("register")
  const [cats, setCats] = useState([])
  const [filteredCats, setFilteredCats] = useState([])
  const [filterMonth, setFilterMonth] = useState('Todos')

  const registerForm = (e) => {
    e.preventDefault();
    const newCats = cats.concat({
      mes: e.target.mes.value,
      recebidos: e.target.recebidos.value,
      atendidos: e.target.atendidos.value
    })
    setCats(newCats)

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
            <h1>
                Bem vindo ao registrador de incidentes!
                <button onClick={() => setHasStarted(true)}>Iniciar</button>
            </h1>
        </div>  
      }
      
      {hasStarted &&
          <div>

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
                      <select value={filterMonth} name="mes">
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
                      <input name="recebidos" type="number" placeholder='Número de Chamados Recebidos'></input>
                      <input name="atendidos" type="number" placeholder='Número de Chamados Atendidos'></input>
                      <button>Registrar</button>
                  </form>
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
                          <div>
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
