import { Navigate, Outlet } from 'react-router-dom';

const Recutriterprotectedroutes = () => {
    const id = sessionStorage.getItem('companyId');
    return id ? <Outlet /> : <Navigate to="/recutrierslogin" />;
}

export default Recutriterprotectedroutes
