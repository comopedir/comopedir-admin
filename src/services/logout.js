import { useHistory } from "react-router-dom";

export default () => {
  
  let history = useHistory();

  localStorage.removeItem('@comopedir:token');
  localStorage.removeItem('@comopedir:businessId');
  history.push('/login');
  return null;
}
