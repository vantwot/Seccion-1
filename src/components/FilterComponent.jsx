import { useState } from 'react'
import '../styles/FilterComponent.css'

const FilterComponent = ({ onFiltersApply, onClearFilters, countries }) => {
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    name: '',
    region: '',
    capital: '',
    populationMin: '',
    populationMax: ''
  })

  const uniqueRegions = [...new Set(countries.map(country => country.region).filter(Boolean))]

  const handleInputChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const [errorMsg, setErrorMsg] = useState('')

  const handleApplyFilters = () => {
    setErrorMsg('')
    const minPop = filters.populationMin ? parseInt(filters.populationMin) : null
    const maxPop = filters.populationMax ? parseInt(filters.populationMax) : null
    if (minPop !== null && maxPop !== null && maxPop < minPop) {
      setErrorMsg('El máximo no puede ser menor que el mínimo')
      return
    }
    onFiltersApply(filters)
    setShowFilters(false)
  }

  const handleClearFilters = () => {
    const emptyFilters = {
      name: '',
      region: '',
      capital: '',
      populationMin: '',
      populationMax: ''
    }
    setFilters(emptyFilters)
    setErrorMsg('')
    onClearFilters()
  }

  const formatNumber = (value) => {
    return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const handlePopulationChange = (field, value) => {
    const numericValue = value.replace(/,/g, '')
    if (numericValue === '' || /^\d+$/.test(numericValue)) {
      setFilters(prev => ({
        ...prev,
        [field]: numericValue
      }))
    }
  }

  return (
    <div className="filter-component">
      <button 
        className="filter-toggle-btn"
        onClick={() => setShowFilters(!showFilters)}
      >
        Filtros
        <span className={`arrow ${showFilters ? 'up' : 'down'}`}>▼</span>
      </button>

      {showFilters && (
        <div className="filter-panel">
          <div className="filter-grid">
            <div className="filter-field">
              <label htmlFor="name-filter">Nombre del País:</label>
              <input
                id="name-filter"
                type="text"
                placeholder="Ej: Colombia"
                value={filters.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-field">
              <label htmlFor="region-filter">Región:</label>
              <select
                id="region-filter"
                value={filters.region}
                onChange={(e) => handleInputChange('region', e.target.value)}
                className="filter-select"
              >
                <option value="">Todas las regiones</option>
                {uniqueRegions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            <div className="filter-field">
              <label htmlFor="capital-filter">Capital:</label>
              <input
                id="capital-filter"
                type="text"
                placeholder="Ej: Bogotá"
                value={filters.capital}
                onChange={(e) => handleInputChange('capital', e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-field population-field">
              <label>Población:</label>
              <div className="population-range">
                <input
                  type="text"
                  placeholder="Mínimo"
                  value={formatNumber(filters.populationMin)}
                  onChange={(e) => handlePopulationChange('populationMin', e.target.value)}
                  className="filter-input population-input"
                />
                <span className="range-separator">-</span>
                <input
                  type="text"
                  placeholder="Máximo"
                  value={formatNumber(filters.populationMax)}
                  onChange={(e) => handlePopulationChange('populationMax', e.target.value)}
                  className="filter-input population-input"
                />
              </div>
              {errorMsg && (
                <div style={{ color: '#e74c3c', marginTop: '0.5rem', fontWeight: 'bold' }}>
                  {errorMsg}
                </div>
              )}
            </div>
          </div>

          <div className="filter-actions">
            <button 
              className="apply-btn"
              onClick={handleApplyFilters}
            >
              Aplicar Filtros
            </button>
            <button 
              className="clear-btn"
              onClick={handleClearFilters}
            >
              Limpiar Filtros
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterComponent
