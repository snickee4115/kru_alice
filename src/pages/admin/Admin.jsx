import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from '../../components/AdminHeader'
import DataContext from '../../data/DataContext'
import './Admin.css'


const Admin = () => {
    const [undo, setUndo] = useState(true);
    const [home, setHome] = useState(false);
    const [uback, setUback] = useState();
  return (
    <DataContext.Provider value={{setUndo:setUndo, setHome, home, uback, setUback}}>
        <div className='admin_container'>
            <AdminHeader useHome={home} useUndo={undo}/>
            <Outlet />
        </div>
    </DataContext.Provider>
  )
}

export default Admin