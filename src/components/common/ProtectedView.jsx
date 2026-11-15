
function ProtectedView({ session, allowedRoles, children }) {
  if (!session) {
    return null;
  }

  if (!allowedRoles.includes(session.user.role)) {
    return <p>Accès refusé</p>;
  }

  return children;
}

export default ProtectedView;
