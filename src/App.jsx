import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import './App.css'
// import Lander from "./pages/Lander";
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
// import Category from "./pages/Category";
import Settings from './pages/Settings';
import { Toaster } from "react-hot-toast";
import PublicRoutes from './services/ProtectedRoutes/PublicRoutes';
import ProtectedRoutes from './services/ProtectedRoutes/ProtectedRoutes';
// import UsernameProtectedRoute from './services/ProtectedRoutes/UsernameProtectedRoute';
import { UserProvider } from "./services/Context/UserContext";
import Dashboard from "./pages/Dashboard/Dashboard";
import ContactCenter from './pages/ContactCenter/ContactCenter'
import Analytics from "./pages/Analytics/Analytics";
import ChatBot from "./pages/ChatBot/ChatBot";
import Team from "./pages/Team";
import ChatBotCustomizationProvider from "./services/Context/ChatBotCustomization";
import Lander from "./pages/Lander/Lander";
import TeamsContextProvider from "./services/Context/TeamsContext";

function App() {

  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={
            <PublicRoutes>
              <Lander />
            </PublicRoutes>
          } />
          <Route path="/sign-up" element={
            <PublicRoutes>
              <SignUp />
            </PublicRoutes>
          } />
          <Route path='/sign-in' element={
            <PublicRoutes>
              <SignIn />
            </PublicRoutes>
          } />
          {/* <Route path='/category' element={
            <UsernameProtectedRoute>
            <Category />
            </UsernameProtectedRoute>
          } /> */}
          <Route path='/dashboard' element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          } />
          <Route path='/contact-center' element={
            <ProtectedRoutes>
              <TeamsContextProvider>
                <ContactCenter />
              </TeamsContextProvider>
            </ProtectedRoutes>
          } />
          <Route path='/analytics' element={
            <ProtectedRoutes>
              <Analytics />
            </ProtectedRoutes>
          } />
          <Route
            path='/chat-bot'
            element={
              <ProtectedRoutes>
                <ChatBotCustomizationProvider>
                  <ChatBot />
                </ChatBotCustomizationProvider>
              </ProtectedRoutes>
            }
          />
          <Route path='/team' element={
            <ProtectedRoutes>
              <TeamsContextProvider>
                <Team />
              </TeamsContextProvider>
            </ProtectedRoutes>
          } />
          <Route path='/settings' element={
            <ProtectedRoutes>
              <Settings />
            </ProtectedRoutes>
          } />
        </Routes>
      </UserProvider>
      <Toaster />
    </Router>
  )
}

export default App
