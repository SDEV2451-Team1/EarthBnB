// Imports needed: Link from 'react-router-dom'

// TODO: Export a default function `PropertyCard({ id, title, average_rating, city, country,
//   price_per_night, property_type, bedrooms, bathrooms, photos = [] })` that:
//   1. Finds the primary photo by looking for the item with is_primary === true in photos,
//      falling back to photos[0], then null if the array is empty.
//   2. Renders a DaisyUI compact card (card card-compact, max-w-sm, shadow) with:
//      - A <figure> (h-48, overflow-hidden) that shows:
//          · An <img> of primaryPhoto.image when a photo exists (w-full, h-full, object-cover)
//          · A "No photo available" placeholder div when there is no photo
//      - A card body with:
//          · A row containing the property title (card-title, text-base) and
//            average_rating formatted as "★ X.X" in green (shrink-0)
//          · Location line: "city, country" in gray
//          · A flex-wrap row of small badges/spans for property_type, bedrooms, bathrooms
//            (e.g. "2 beds · 1 bath")
//          · A card-actions row with the price per night (large, green, "/ night" label)
//            and a green "View" <Link> button to /properties/:id
