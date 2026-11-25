import { useContext } from 'react'
import { PropertySearchFiltersContext } from '../contexts/PropertySearchFiltersContext'

export function usePropertySearchFilters() {
    const context = useContext(PropertySearchFiltersContext)
    if (!context) {
        throw new Error('usePropertySearchFilters must be used inside a PropertySearchFiltersProvider')
    }
    return context
}
