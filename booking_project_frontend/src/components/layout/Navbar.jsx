import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

function Navbar() {
  const { user, logout } = useAuth()

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold text-green-600">
          EarthBnB
        </Link>
      </div>
      <div className="flex-none">
        {/* TODO: If user is authenticated, show a dropdown with:
              - The user's username initial as an avatar button
              - The username as a menu title
              - A "My Host Profile" link (to /hosts/:id) visible only when user.role === 'host'
              - A "Sign out" button that calls logout()
            If user is not authenticated, show a "Sign In" link button to /login. */}
        <Link to="/login" className="btn btn-success btn-sm text-white">
          Sign In
        </Link>
      </div>
    </div>
  )
}

export default Navbar
