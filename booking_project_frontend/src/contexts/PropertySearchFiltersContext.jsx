import { createContext, useState, useEffect } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const PropertySearchFiltersContext = createContext(null)

const defaultFilters = {
    search: '',
    min_price: 0,
    max_price: 10000,
    property_type: '',
    check_in_date: '',
    check_out_date: '',
    guests: 1,
    page: 1,
}

export function PropertySearchFiltersProvider({ children }) {
    const [filters, setFilters] = useState(() => {
        const storedFilters = localStorage.getItem('earthbnb_search_filters')

        try {
            return storedFilters
                ? { ...defaultFilters, ...JSON.parse(storedFilters) }
                : defaultFilters
        } catch {
            return defaultFilters
        }
    })

    // Save filters so they persist after refreshing
    useEffect(() => {
        localStorage.setItem('earthbnb_search_filters', JSON.stringify(filters))
    }, [filters])

    // Reset to the first page when filters change
    function updateFilters(newFilters) {
        setFilters(prev => ({
            ...prev,
            ...newFilters,
            page: 1,
        }))
    }

    function setPage(page) {
        setFilters(prev => ({
            ...prev,
            page,
        }))
    }

    const value = {
        ...filters,
        updateFilters,
        setPage,
    }

    return (
        <PropertySearchFiltersContext.Provider value={value}>
            {children}
        </PropertySearchFiltersContext.Provider>
    )
}
