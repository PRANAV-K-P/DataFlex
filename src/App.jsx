import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminRoutes from "./Routes/AdminRoutes";
import UserRoutes from "./Routes/UserRoutes";
function App() {
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="/*" element={<UserRoutes />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
