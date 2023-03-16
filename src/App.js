import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import Admin from "./pages/Admin";
import Card from "./pages/Card";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Student from "./pages/Student";
import StudSection from "./pages/StudSection";
import Teacher from "./pages/Teacher";
import { UserProvider } from "./userContext";

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    console.log(user)
  }, [user])

  const unSetUser =() => {
    localStorage.clear();
  }
  return (
    <div className="App">
    <div className="main">
    <UserProvider value={{user, setUser, unSetUser}}>
    <Router>
    <NavBar />
        <Routes>
          <Route path='/card/:id' element={<Card />} />
          <Route path='/studsection/:_id' element={<StudSection />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/' element={<Login />}/>
          <Route path='/admin' element={<Admin />}/>
          <Route path='/teacher' element={<Teacher />}/>
          <Route path='/student' element={<Student />}/>
        </Routes>
      </Router>
      </UserProvider>
    </div>
    </div>
  );
}

export default App;
