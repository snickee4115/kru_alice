import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from '../../components/AdminHeader'
import DataContext from '../../data/DataContext'
import './Admin.css'


const Admin = () => {
    const [undo, setUndo] = useState(true);
  return (
    <DataContext.Provider value={{setUndo:setUndo}}>
        <div className='admin_container'>
            <AdminHeader useUndo={undo}/>
            <Outlet />
        </div>
    </DataContext.Provider>
  )
}

export default Admin