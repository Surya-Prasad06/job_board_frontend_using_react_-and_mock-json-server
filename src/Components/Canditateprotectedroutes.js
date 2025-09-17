import { Navigate, Outlet } from 'react-router-dom';

const Canditateprotectedroutes = () => {
    const id = sessionStorage.getItem("candiateid");
    return id ? <Outlet /> : <Navigate to="/candidatesuserlogin" />;

}

export default Canditateprotectedroutes
