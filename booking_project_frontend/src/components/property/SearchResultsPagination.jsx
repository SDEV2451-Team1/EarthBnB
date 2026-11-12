// Imports needed: usePropertySearchFilters (default) from '../../hooks/usePropertySearchFilters'

// TODO: Export a default function `SearchResultsPagination()` that:
//   1. Calls usePropertySearchFilters() to get filters and setPage.
//      Derives currentPage from filters.page.
//   2. Renders a DaisyUI join centred below the results with three buttons:
//      - "« Previous": disabled when currentPage <= 1; onClick calls setPage(currentPage - 1)
//      - "Page {currentPage}": non-interactive display button (pointer-events-none)
//      - "Next »": onClick calls setPage(currentPage + 1)
//      Style the active/hover state with green colours to match the rest of the UI.
