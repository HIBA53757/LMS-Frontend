
import { useState } from 'react'
import './App.css'

import Login from './components/auth/Login.jsx'
import AppShell from './components/layout/AppShell.jsx'
import AdminLayout from './components/layout/AdminLayout.jsx'
import LearnerLayout from './components/layout/LearnerLayout.jsx'
import ProtectedView from './components/common/ProtectedView.jsx'

function App() {
  const [session, setSession] = useState(null)
  const [currentView, setCurrentView] = useState('users')

  function handleLogin(response) {
    setSession({
      token: response.token,
      user: response.data.user
    })
  }

  function handleLogout() {
    setSession(null)
    setCurrentView('users')
  }

  function handleNavigate(view) {
    setCurrentView(view)
  }

  if (!session) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <AppShell user={session.user} onLogout={handleLogout}>

      {session.user.role === 'admin' && (
        <ProtectedView
          session={session}
          allowedRoles={['admin']}
        >
          <AdminLayout
            currentView={currentView}
            onNavigate={handleNavigate}
          >
            {currentView === 'users' && (
              <h2>Gestion des utilisateurs</h2>
            )}

            {currentView === 'courses' && (
              <h2>Catalogue des cours</h2>
            )}
          </AdminLayout>
        </ProtectedView>
      )}

      {session.user.role === 'learner' && (
        <ProtectedView
          session={session}
          allowedRoles={['learner']}
        >
          <LearnerLayout user={session.user}>
            <h2>Mes cours</h2>
          </LearnerLayout>
        </ProtectedView>
      )}

    </AppShell>
  )
}

export default App
