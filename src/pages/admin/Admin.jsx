import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from '../../components/AdminHeader'
import DataContext from '../../data/DataContext'
import './Admin.css'
import Loading from '../../components/Loading'

const Admin = () => {
    const [undo, setUndo] = useState(true);
    const [home, setHome] = useState(false);
    const [uback, setUback] = useState();
    const [hasLoaded, setHasLoaded] = useState();
    const [loading, setLoading] = useState(true);
  
  
    useEffect(()=>{
      setHasLoaded(true);
      // setLoading(false)
    }, [])
  
  
  return hasLoaded ? (
    <DataContext.Provider value={{setUndo:setUndo, setHome, home, uback, setUback, setLoading, loading}}>
        <div className={!loading ? 'admin_container' : 'aaa'}>
          
            {!loading ? <AdminHeader useHome={home} useUndo={undo}/> : null}
            <Outlet />
        </div>
    </DataContext.Provider>
  ):null
}

export default Admin