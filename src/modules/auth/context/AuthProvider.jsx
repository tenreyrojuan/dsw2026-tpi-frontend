import { createContext, useState } from 'react';
import { loginAdmin } from '../services/adminLogin';
import { loginPatient } from '../services/patientLogin';
import { savePatientDni } from '../helpers/patientSession';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('token');

    return Boolean(token);
  });

  const [username, setUsername] = useState(() =>
    localStorage.getItem('username')
  );
  const [role, setRole] = useState(() => localStorage.getItem('role'));

  const singout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUsername(null);
    setRole(null);
  };

  const setAuthSession = (token, username = '', role = '') => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('role', role.toUpperCase());
    setUsername(username);
    setRole(role.toUpperCase());
    setIsAuthenticated(true);
  };

  const singinAdmin = async (username, password) => {

    const { data, role, error } = await loginAdmin(username, password);

    if (error) {
      return { error };
    }

    setAuthSession(data, username, role);

    return { error: null };
  };

  const singinPatient = async (username, dni) => {
    const { data, role, error } = await loginPatient(username, dni);

    if (error) {
      return { error };
    }

    setAuthSession(data, username, role);
    savePatientDni(dni);

    return { error: null };
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        username,
        role,
        singinAdmin,
        singinPatient,
        singout,
        setAuthSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
