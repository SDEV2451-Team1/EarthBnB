// Imports needed: useProperties (default) from '../../hooks/useProperties'
//                 PropertyCard (default) from './PropertyCard'
//                 SearchResultsPagination (default) from './SearchResultsPagination'

// TODO: Export a default function `SearchResults()` that:
//   1. Calls useProperties() to get { properties, count, isLoading, isError }.
//   2. If isLoading, renders a <section> with:
//      - A green loading banner with a spinner and "Searching for properties…"
//      - A responsive 3-column skeleton grid of 6 placeholder cards
//        (each card has a skeleton image area and three skeleton text lines)
//   3. If isError, renders a <section> with an error alert:
//      "Failed to load properties. Please try again."
//   4. Otherwise renders a <section> with:
//      - A green banner showing the count and "property / properties found"
//      - If properties.length === 0: a centred empty-state message with a house emoji,
//        "No properties found", and "Try adjusting your search or filters."
//      - Otherwise: a responsive 3-column grid of <PropertyCard> components,
//        spreading each property object as props (key={property.id})
//      - <SearchResultsPagination /> below the grid
