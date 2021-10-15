import {Redirect, Route} from 'react-router-dom';
import {useSelector} from "react-redux";

// @ts-ignore
export function ProtectedRoute({ children, ...rest }) {
    // @ts-ignore
    const auth = useSelector(store => (store.burgerCartReducer.reg.login));
    return (
        <Route
            {...rest}
            render={() =>
                auth ? (
                    children
                ) : (
                    <Redirect
                        to='/login'
                    />
                )
            }
        />
    );
}