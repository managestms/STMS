"use client"

import { useState } from "react"
import Sidebar from "./Sidebar"
import Header from "./Header"
import Dashboard from "./Dashboard"
import AddRawImli from "./AddRawImli"
import AssignImli from "./AssignImli"
import ImliReturned from "./ImliReturned"
import AddLocals from "./AddLocals"

const AdminLayout = () => {
  const [activePage, setActivePage] = useState("dashboard")

  const pageConfig = {
    dashboard: { component: Dashboard, title: "DASHBOARD GENERAL" },
    addLocals : {component : AddLocals, title :"ADD LOCALS"},
    addRawImli: { component: AddRawImli, title: "ADD RAW IMLI IN STOCKS" },
    assignImli: { component: AssignImli, title: "ASSIGN IMLI" },
    imliReturned: { component: ImliReturned, title: "IMLI RETURNED" },
  }

  const currentPage = pageConfig[activePage]
  const CurrentComponent = currentPage.component

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />
      <div className="flex-1 flex flex-col">
        <Header title={currentPage.title} />
        <div className="flex-1 overflow-auto">
          <CurrentComponent />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
