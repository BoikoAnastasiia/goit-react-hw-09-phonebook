import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelectors } from '../../redux/auth';

/**
 * If a route is privite and a user is logged, render a component
 * Otherwise it renders Redirect to /login
 */

export default function PrivateRoute({
  children,
  isAuthenticated,
  redirectTo,
  ...routeProps
}) {
  const isLoggedIn = useSelector(authSelectors.getIsAuthenticated);
  return (
    <Route {...routeProps}>
      {isLoggedIn ? children : <Redirect to={redirectTo} />}
    </Route>
  );
}
