import { NavLink } from 'react-router-dom';

const links = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/products', label: 'All Products' },
  { to: '/admin/add-product', label: 'Add Product' },
  { to: '/admin/orders', label: 'Orders' },
];

const AdminSidebar = () => (
  <aside className="w-56 shrink-0 bg-brand-dark text-white min-h-screen p-6 space-y-2">
    <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
    {links.map((link) => (
      <NavLink
        key={link.to}
        to={link.to}
        end={link.end}
        className={({ isActive }) =>
          `block px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-brand-pink text-brand-dark' : 'hover:bg-white/10'}`
        }
      >
        {link.label}
      </NavLink>
    ))}
  </aside>
);

export default AdminSidebar;