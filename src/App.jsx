import { useState, useEffect } from 'react'
import ApiManager from './api/ApiManager'
import FilterComponent from './components/FilterComponent'
import Pagination from './components/Pagination'
import './App.css'

function App() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('')
  const [advancedFilters, setAdvancedFilters] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    fetchCountries()
  }, [])

  useEffect(() => {
    filterCountries()
  }, [countries, filter, advancedFilters])

  const fetchCountries = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await ApiManager.getAllCountries()
      setCountries(response.data)
    } catch (err) {
      setError('Error al cargar los países. Por favor, intenta de nuevo.')
      console.error('Error fetching countries:', err)
    } finally {
      setLoading(false)
    }
  }

  const filterCountries = () => {
    let filtered = [...countries]

    if (advancedFilters) {
      if (advancedFilters.name) {
        filtered = filtered.filter(country =>
          country.name.common.toLowerCase().includes(advancedFilters.name.toLowerCase())
        )
      }

      if (advancedFilters.region) {
        filtered = filtered.filter(country =>
          country.region === advancedFilters.region
        )
      }

      if (advancedFilters.capital) {
        filtered = filtered.filter(country =>
          country.capital && 
          country.capital[0].toLowerCase().includes(advancedFilters.capital.toLowerCase())
        )
      }

      if (advancedFilters.populationMin) {
        const minPop = parseInt(advancedFilters.populationMin)
        filtered = filtered.filter(country => country.population >= minPop)
      }

      if (advancedFilters.populationMax) {
        const maxPop = parseInt(advancedFilters.populationMax)
        filtered = filtered.filter(country => country.population <= maxPop)
      }
    }

    setFilteredCountries(filtered)
    setCurrentPage(1) 
  }

  const formatPopulation = (population) => {
    return new Intl.NumberFormat('es-CO').format(population)
  }

  const handleAdvancedFiltersApply = (filters) => {
    setAdvancedFilters(filters)
    setFilter('') 
  }

  const handleAdvancedFiltersClear = () => {
    setAdvancedFilters(null)
    setFilter('')
  }

  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentCountries = filteredCountries.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }


  if (loading) {
    return (
      <div className="app">
        <h1>🇨🇴 Países del Mundo</h1>
        <div className="loading">Cargando países...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app">
        <h1>🇨🇴 Países del Mundo</h1>
        <div className="error">
          {error}
          <button onClick={fetchCountries} className="retry-btn">
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <h1>🇨🇴 Países del Mundo</h1>
      
      <FilterComponent 
        onFiltersApply={handleAdvancedFiltersApply}
        onClearFilters={handleAdvancedFiltersClear}
        countries={countries}
      />

      <div className="table-container">
        <table className="countries-table">
          <thead>
            <tr>
              <th>Bandera</th>
              <th>Nombre</th>
              <th>Región</th>
              <th>Capital</th>
              <th>Población</th>
            </tr>
          </thead>
          <tbody>
            {currentCountries.map((country) => (
              <tr key={country.cca2}>
                <td className="flag-cell">
                  <img
                    src={country.flags.svg}
                    alt={`Bandera de ${country.name.common}`}
                    className="flag-img"
                  />
                </td>
                <td className="country-name">{country.name.common}</td>
                <td className="region">{country.region || 'N/A'}</td>
                <td className="capital">{country.capital ? country.capital[0] : 'N/A'}</td>
                <td className="population">{formatPopulation(country.population || 0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default App
