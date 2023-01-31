import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'

function App() {


  const [selectedUf, ] = useState('GO')
  const [selectedCity, ] = useState('Goiânia')
  const [logradouro, setLogradouro] = useState('')
  const [result, setResult] = useState([])
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)


  function handleSubmit(e) {
    e.preventDefault()

    const params = {
      uf: selectedUf,
      city: selectedCity,
      logradouro: logradouro
    }
    setLoading(true)
    axios.get('http://localhost:3333/buscar', {params})
      .then(response => {
        setResult(response.data)
        setErrors([])
      }).catch(err => {
        console.log(err)
        if (err?.response?.status == 400) {
          setErrors(err.response.data.errors)
        } else {
          setErrors(['Erro interno do servidor'])
        }
      }).finally(setLoading(false))

  }

  return (
    <>
      <div className='main-container'>
        <div>
          <h1>
            Sistema de busca
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor=''>UF:</label>
            <select name='uf'value={selectedUf} required >
              <option value={'GO'} >GO</option>
            </select>
          </div>
          <div>
            <label htmlFor='city'>Cidade:</label>
            <select name='city' id='city' disabled={selectedUf ? false : true} value={selectedCity} required >
              <option value={'Goiânia'}>Goiânia</option>
            </select>
          </div>
          <div>
            <label htmlFor='logradouro'>Logradouro:</label>
            <input type='text' name='logradouro' id='logradouro' disabled={selectedCity ? false : true} onChange={(e) => setLogradouro(e.target.value)} required minLength={3} />
          </div>

          <div className='btn'>
            <button type='submit' disabled={loading}>{loading ? 'Carregando' : 'Pesquisar'}</button>
          </div>
        </form>
        <span className='error'>{!!errors.length && errors.map(error =>
          <li key={error}>{error}</li>
        )}</span>
      </div>
      <div className='address-container'>
        {loading && <p>Carregando</p>}
        {!!result.length && (
          <table>
            <thead>
              <tr>
                <th>Logradouro</th>
                <th>Bairro</th>
                <th>UF</th>
                <th>Cep</th>
              </tr>
            </thead>
            <tbody>
              {result.map((address, index) => {
                return (
                  <tr key={index} className='address'>
                    <td>{address.logradouro}</td>
                    <td>{address.bairro}</td>
                    <td>{address.uf}</td>
                    <td>{address.cep}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

export default App
