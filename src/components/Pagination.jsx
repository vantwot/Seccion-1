import React from 'react'
import '../styles/Pagination.css'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageButtons = () => {
    const pageButtons = []
    // Siempre mostrar 5 botones cuando sea posible, pero no más que el número total de páginas
    
    // Si hay 5 o menos páginas totales, mostrar todas las páginas sin elipsis
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`pagination-btn ${currentPage === i ? 'active' : ''}`}
          >
            {i}
          </button>
        )
      }
      return pageButtons
    }
    
    // Si hay más de 5 páginas, necesitamos decidir cuáles mostrar
    
    // Caso 1: Página actual está cerca del inicio (1-3)
    if (currentPage < 4) {
      // Mostrar páginas 1-4
      for (let i = 1; i <= 4; i++) {
        pageButtons.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`pagination-btn ${currentPage === i ? 'active' : ''}`}
          >
            {i}
          </button>
        )
      }
      
      // Agregar elipsis y última página
      pageButtons.push(<span key="ellipsis" className="pagination-ellipsis">...</span>)
      pageButtons.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`pagination-btn ${currentPage === totalPages ? 'active' : ''}`}
        >
          {totalPages}
        </button>
      )
    } 
    // Caso 2: Página actual está cerca del final
    else if (currentPage > totalPages - 3) {
      // Mostrar primera página y elipsis
      pageButtons.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className={`pagination-btn ${currentPage === 1 ? 'active' : ''}`}
        >
          1
        </button>
      )
      pageButtons.push(<span key="ellipsis" className="pagination-ellipsis">...</span>)
      
      // Mostrar últimas 4 páginas
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pageButtons.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`pagination-btn ${currentPage === i ? 'active' : ''}`}
          >
            {i}
          </button>
        )
      }
    } 
    // Caso 3: Página actual está en el medio
    else {
      // Mostrar primera página y elipsis
      pageButtons.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className={`pagination-btn ${currentPage === 1 ? 'active' : ''}`}
        >
          1
        </button>
      )
      pageButtons.push(<span key="ellipsis1" className="pagination-ellipsis">...</span>)
      
      // Mostrar página actual y adyacentes
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageButtons.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`pagination-btn ${currentPage === i ? 'active' : ''}`}
          >
            {i}
          </button>
        )
      }
      
      // Agregar elipsis y última página
      pageButtons.push(<span key="ellipsis2" className="pagination-ellipsis">...</span>)
      pageButtons.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`pagination-btn ${currentPage === totalPages ? 'active' : ''}`}
        >
          {totalPages}
        </button>
      )
    }
    
    return pageButtons
  }

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-btn"
      >
        Anterior
      </button>
      {renderPageButtons()}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-btn"
      >
        Siguiente
      </button>
    </div>
  )
}

export default Pagination
