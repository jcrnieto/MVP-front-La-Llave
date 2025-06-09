import { useLocalStorage } from 'react-use';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user, , removeUser] = useLocalStorage('user');
  const navigate = useNavigate();

  const handleLogout = () => {
    removeUser();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 shadow-md px-4 py-4">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-2 sm:mb-0">
          <img src="/logo.png" alt="Logo" className="h-8 w-8" />
          
        </div>

        {/* Botón de cerrar sesión o login */}
        <ul className="flex items-center">
          {!user && (
            <li>
              <a href="/login" className="text-gray-700 hover:text-orange-500">
                Login
              </a>
            </li>
          )}
          {user && (
            <li>
              <button
                onClick={handleLogout}
                className="bg-white text-black px-4 py-2 rounded-lg hover:bg-orange-600 transition"
              >
                Cerrar sesión
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
