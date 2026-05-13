import { Outlet, Link, NavLink } from "react-router-dom";
import logo from "@assets/Footer/logo.svg";
import { Menu, Box, User } from "lucide-react";

const menu = [
  {
    key: "products",
    label: "products",
    path: "/auth/admin/products",
    icon: <Box size={20} />,
  },
];

const AdminDashboard = () => {
  return (
    <div className="grid grid-cols-[250px,minmax(0,1fr)] gap-[30px]">
      <div className="p-[20px] border-r-[1px] border-gray-200">
        <Link to={"/"} className="flex items-center justify-center px-[30px]">
          <img src={logo} />
        </Link>

        <div className="mt-[20px]">
          <ul className="flex flex-col gap-[10px]">
            {menu.map((item) => {
              return (
                <li>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex gap-[10px] items-center py-[10px] rounded-[10px] px-[20px] ${isActive ? "bg-[#14c9c9] text-white font-semibold" : ""} `
                    }
                  >
                    {item.icon}
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="px-[30px]">
        <div className="h-[60px] flex justify-between items-center">
          <div>
            <Menu size={24} />
          </div>

          <User size={20} />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
