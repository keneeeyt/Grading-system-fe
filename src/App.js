import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./components/NotFound";
import Admin from "./pages/Admin";
import Card from "./pages/Card";
import Delete from "./pages/Delete";
import DeleteSection from "./pages/DeleteSection";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Student from "./pages/Student";
import StudSection from "./pages/StudSection";
import Teacher from "./pages/Teacher";
import { UserProvider } from "./UserContext";

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
   
    <Router>
    <UserProvider value={{user, setUser, unSetUser}}>
        <Routes>
      
           <Route path='/' element={<Home />}/>
           <Route path='/login' element={<Login />}/>
           <Route path='/admin' element={  <Admin /> }/>
          <Route path="/*" element={<NotFound/>} />
          <Route path='/card/:id' element={<Card />} />
          <Route path='/studsection/:id' element={<StudSection />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/teacher' element={ <Teacher /> }/>
          <Route path='/user' element={ <Student />}/>
          <Route path='/delete/:id' element={<Delete />} />
          <Route path='/delete-section/:id' element={<DeleteSection />} />
       
        </Routes>
        </UserProvider>
      </Router>
     
    </div>
    </div>
  );
}

export default App;
