import {Redirect, Route} from 'react-router-dom';
import {useSelector} from "react-redux";

// @ts-ignore
export function ProtectedRoute({ children, ...rest }) {
    const auth = useSelector((store: any) => (store.authReducer.reg.login));
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