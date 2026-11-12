import { useState } from 'react'

function DrawerLayout({ sidebar, children, title }) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className={`drawer min-h-screen ${isOpen ? 'lg:drawer-open' : ''}`}>
      <input id="site-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        {/* Mobile: label toggles DaisyUI overlay; Desktop: button controls React state */}
        <div className="p-2 flex items-center gap-2 w-fit">
          <label
            htmlFor="site-drawer"
            className="btn btn-sm btn-ghost lg:hidden items-center gap-1"
            aria-label="Open sidebar"
          >
            ☰
            {title && <span>{title}</span>}
          </label>
          <button
            onClick={() => setIsOpen(open => !open)}
            className="btn btn-sm btn-ghost hidden lg:flex items-center gap-1"
            aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {isOpen ? '◀' : '▶'}
            {title && <span>{title}</span>}
          </button>
        </div>

        {children}
      </div>

      <div className="drawer-side z-20">
        <label htmlFor="site-drawer" className="drawer-overlay" />
        <aside className="w-64 min-h-full bg-base-200 p-4">
          {title && <h2 className="text-lg font-bold mb-4">{title}</h2>}
          {sidebar}
        </aside>
      </div>
    </div>
  )
}

export default DrawerLayout
