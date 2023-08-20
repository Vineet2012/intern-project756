import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import UserInfoCmp from './page1/userInfo';
import Page2Cmp from "./page2/page2";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<UserInfoCmp />} />
          <Route path="/page2" element={<Page2Cmp />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
