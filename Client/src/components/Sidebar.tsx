import { CalendarDaysIcon, LayoutDashboardIcon, LogOutIcon, UsersIcon, Wand2Icon } from 'lucide-react'
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Sidebar = ({isOpen, setIsOpen} : {isOpen: boolean, setIsOpen: (val: boolean) => void}) => {
  
  const {logout, user} = useAuth();
  
  const location = useLocation();
  
  const navItems = [
    {name: "Dashboard", icon: LayoutDashboardIcon, path: "/dashboard"},
    {name: "Accounts", icon: UsersIcon, path: "/accounts" },
    {name: "Scheduler", icon: CalendarDaysIcon, path: "/schedule" },
    {name: "AI Composer", icon: Wand2Icon, path: "/ai-composer" },
  ]

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 
    flex flex-col h-full transform transition-transform duration-200 ease-in-out
    md:relative md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>

      {/* Logo */}
      <div className="p-6 pb-4">
        <div className='text-xl tracking-tight text-slate-800 flex items-center gap-1.5'>
          <img src="/logo.svg" alt="logo" className='size-6' />
          Scheduler
        </div>
      </div>

      {/* Nav section label */}
      <div className='px-6 py-2'>
        <span className='text-xs text-slate-500 uppercase tracking-wider'>Menu</span>
      </div>

      {/* Nav links */}
      <nav className='flex-1 px-3 space-y-1'>
        {navItems.map((item)=>{
          return (
            <NavLink 
              key={item.name}
              to={item.path}
              end={item.path === "/dashboard"}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {({ isActive }) => (
                <>
                  <item.icon className={`size-4.5 shrink-0 ${isActive ? "text-red-500" : "text-slate-500"}`} />
                  {item.name}
                  {isActive && <span className='ml-auto w-[5px] h-5 rounded-full bg-red-500' />}
                </>
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* Fixed User Footer & Sign Out Section */}
      <div className="p-4 border-t border-slate-100 space-y-2">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
          <div className='size-8 rounded-full bg-gradient-to-br from-red-400 to-pink-400 flex items-center justify-center text-white text-sm font-medium shrink-0'>
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div className='flex-1 min-w-0'>
            <div className='text-sm font-medium text-slate-800 truncate'>{user?.name || "User"}</div>
            <div className='text-xs text-slate-400 truncate'>{user?.email || "user@example.com"}</div>
          </div>
        </div>

        <button 
          onClick={logout} 
          className="flex items-center gap-3 px-2 py-2 w-full rounded-lg text-sm text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all duration-150 font-medium"
        >
          <LogOutIcon className="size-4 shrink-0" />
          Sign Out
        </button>
      </div>

    </div>
  )
}

export default Sidebar