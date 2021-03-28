import React, { useContext } from 'react';
import { Redirect, Route, useHistory, useLocation } from 'react-router';
import { UserContext } from '../App';

const PrivateRoute = ({ children, ...rest }) => {
        const [loggedUser, setLoggedUser] = useContext(UserContext);
        
    return (
        <div>
            <Route
                {...rest}
                     render={({ location }) =>
                      loggedUser.email ? (
                          children
                         ) : (
                         <Redirect
                          to={{
                           pathname: "/login",
                        state: { from: location }
                      }}
                  />
                )
              }
         />
        </div>
    );
};

export default PrivateRoute;