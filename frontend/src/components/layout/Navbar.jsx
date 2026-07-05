

// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FiMenu, FiX, FiShoppingCart } from 'react-icons/fi';
// import { useAuth } from '../../context/AuthContext';
// import { useCart } from '../../context/CartContext';

// const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const { user } = useAuth();
//   const { cart } = useCart();

//   return (
//     <nav className="sticky top-0 z-50 bg-white shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
//         {/* Left */}
//         <Link to="/" className="flex items-center gap-2">
//           <img src="/logo2.png" alt="logo" className="w-12 h-10" />
//           <span className="font-bold text-lg tracking-tight">Export Trade Shop</span>
//         </Link>

//         {/* Middle - desktop */}
//         <div className="hidden md:flex items-center gap-8">
//           <Link to="/cosmetics" className="hover:text-brand-pink transition-colors">Products</Link>
//           <Link to="/about" className="hover:text-brand-pink transition-colors">About Us</Link>
//         </div>

//         {/* Right - desktop: Login OR (cart + profile), never both */}
//         <div className="hidden md:flex items-center gap-4">
//           {!user ? (
//             <Link
//               to="/login"
//               className="px-4 py-2 bg-brand-dark text-white text-sm rounded-full hover:opacity-90"
//             >
//               Login
//             </Link>
//           ) : (
//             <>
//               <Link to="/cart" className="relative">
//                 <FiShoppingCart size={22} />
//                 {cart.items?.length > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-brand-pink text-xs w-4 h-4 rounded-full flex items-center justify-center">
//                     {cart.items.length}
//                   </span>
//                 )}
//               </Link>
//               <Link to={user.role === 'admin' ? '/admin' : '/dashboard'}>
//                 <img
//                   src="https://i.ibb.co.com/xtXkPY7k/woma.jpg"
//                   alt="profile"
//                   className="w-12 h-12 rounded-full object-cover"
//                 />
//               </Link>
//             </>
//           )}
//         </div>

//         {/* Mobile toggle */}
//         <button className="md:hidden" onClick={() => setOpen(!open)}>
//           {open ? <FiX size={26} /> : <FiMenu size={26} />}
//         </button>
//       </div>

//       {/* Mobile menu */}
//       {open && (
//         <div className="md:hidden flex flex-col gap-4 px-6 pb-6 bg-white border-t">
//           <Link to="/cosmetics" onClick={() => setOpen(false)}>Products</Link>
//           <Link to="/about" onClick={() => setOpen(false)}>About Us</Link>
//           {!user ? (
//             <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
//           ) : (
//             <>
//               <Link to="/cart" onClick={() => setOpen(false)}>Cart ({cart.items?.length || 0})</Link>
//               <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setOpen(false)}>
//                 My Account
//               </Link>
//             </>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;







import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingCart, FiChevronDown } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  // Close dropdown when clicking outside it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
        {/* Left */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo2.png" alt="logo" className="w-12 h-10" />
          <span className="font-bold text-lg tracking-tight">Export Trade Shop</span>
        </Link>

        {/* Middle - desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/cosmetics" className="hover:text-brand-pink transition-colors">Products</Link>
          <Link to="/about" className="hover:text-brand-pink transition-colors">About Us</Link>

          {!user && (
            <Link to="/login" className="px-4 py-2 bg-brand-dark text-white rounded-full hover:opacity-90">
              Login
            </Link>
          )}
        </div>

        {/* Right */}
        <div className="hidden md:flex items-center gap-4">
          {user && (
            <>
              <Link to="/cart" className="relative">
                <FiShoppingCart size={22} />
                {cart.items?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-pink text-xs w-4 h-4 rounded-full flex items-center justify-center">
                    {cart.items.length}
                  </span>
                )}
              </Link>

              {/* Profile dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-1"
                >
                  <img
                    src="https://i.ibb.co.com/xtXkPY7k/woma.jpg"
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <FiChevronDown
                    size={16}
                    className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border py-2 z-50">
                    <Link
                      to={user.role === 'admin' ? '/admin' : '/dashboard'}
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-6 bg-white border-t">
          <Link to="/cosmetics" onClick={() => setOpen(false)}>Products</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About Us</Link>
          {!user ? (
            <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
          ) : (
            <>
              <Link to="/cart" onClick={() => setOpen(false)}>Cart ({cart.items?.length || 0})</Link>
              <Link
                to={user.role === 'admin' ? '/admin' : '/dashboard'}
                onClick={() => setOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={() => { handleLogout(); setOpen(false); }}
                className="text-left text-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;