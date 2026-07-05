import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }) => (
  <div className="flex">
    <AdminSidebar />
    <main className="flex-1 p-6 md:p-10 bg-gray-50 min-h-screen">{children}</main>
  </div>
);

export default AdminLayout;