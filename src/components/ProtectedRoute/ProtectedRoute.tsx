import {Redirect, Route} from 'react-router-dom';
import {useSelector} from "react-redux";

// @ts-ignore
export function ProtectedRoute({ children, ...rest }) {
    // @ts-ignore
    const auth = useSelector(store => (store.authReducer.reg.login));
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}