import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"

// admin
import A_Dashboard from "./pages/admin/AdminLayout"

// operator
import O_Dashboard from "./pages/operator/O_Dashboard"
import O_AddImli from "./pages/operator/O_Addimli"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* public */}
        <Route path="/" element={<Login />} />

        {/* admin routes */}
        <Route path="/admin/dashboard" element={<A_Dashboard />} />

        {/* operator routes */}
        <Route path="/operator/dashboard" element={<O_Dashboard />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
