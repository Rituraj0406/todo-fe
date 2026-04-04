import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";
import GoogleIcon from '../../assets/google.png';
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useEffect } from "react";
import { googleLogin } from "../../features/auth/authSlice";
import { showSnackbar } from "../../features/snackbar/snackbarSlice";
import { useGoogleLogin } from "@react-oauth/google";
import Logo from '../../assets/todo.svg';


const Login = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.auth.user);
    const navigate = useNavigate();

    useEffect(() => {
        if(user) {
            navigate('/home', { replace: true });    
        }
    }, [user, navigate]);

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async(tokenResponse: { access_token: string; }) => {
            try {
                await dispatch(googleLogin(tokenResponse.access_token)).unwrap();
                dispatch(showSnackbar({message: 'Login successful', severity: 'success'}));
                navigate('/home', { replace: true });
            } catch (error) {
                console.log('error', error);
                dispatch(showSnackbar({message: 'Google login failed', severity: 'error'}));
            }
        }
    })
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
            <div className="flex items-center gap-2 mb-6 justify-center">
                <img src={Logo} alt="logo" width={32} height={32} />
                <h1>TODO</h1>
            </div>
            <div className="w-full max-w-md shadow-lg shadow-blue-500 p-6 rounded-xl flex flex-col gap-2">
                <LoginForm />
                {/* divider */}
                <div className="flex items-center gap-4 my-4">
                    <div className="flex-1 border-t border-gray-400"></div>
                    <span className="px-2 text-gray-400 text-xs uppercase tracking-wide">
                        OR
                    </span>
                    <div className="flex-1 border-t border-gray-400"></div>
                </div>
                <div className="flex items-center justify-center">
                    <button
                        color="primary"
                        className="text-sm flex items-center justify-center gap-2 rounded-2xl px-5 py-1 border border-sky-500 hover:transform hover:scale-105 transition-transform duration-200 cursor-pointer"
                        onClick={() => handleGoogleLogin()}
                    >
                        <img src={GoogleIcon} alt="google" width={16} height={16} /> Sign in with Google
                    </button>
                </div>
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-500">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-blue-500 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login;