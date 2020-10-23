import React from 'react'
import AdminNavigation from '../../components/AdminNavigation/AdminNavigation'
import useStyles from './AdminLayoutStyle'

const AdminLayout = () => {
  const classes = useStyles()
  return (
    <div>
      <AdminNavigation/>
    </div>
  )
}

export default AdminLayout