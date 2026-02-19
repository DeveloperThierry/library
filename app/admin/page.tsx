import { redirect } from 'next/navigation'
import React from 'react'

const page = () => {
  redirect("/admin/books/new")
  return (
    <div>Admin Dashboard</div>
  )
}

export default page