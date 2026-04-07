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
        scope: "openid email profile",  // 🔥 ADD THIS
        onSuccess: async (tokenResponse) => {
            console.log("TOKEN RESPONSE:", tokenResponse);

            try {
                await dispatch(googleLogin(tokenResponse.access_token)).unwrap();
                dispatch(showSnackbar({ message: 'Login successful', severity: 'success' }));
                navigate('/home', { replace: true });
            } catch (error) {
                console.log('error', error);
                dispatch(showSnackbar({ message: 'Google login failed', severity: 'error' }));
            }
        }
    });
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
            <div className="flex items-center gap-2 mb-6 justify-center">
                <img src={Logo} alt="logo" width={32} height={32} />
                <h1 className="text-2xl font-bold">TODO</h1>
            </div>
            <div className="w-full max-w-md shadow-lg shadow-blue-500/20 dark:shadow-blue-900/40 p-6 rounded-xl flex flex-col gap-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                <LoginForm />
                {/* divider */}
                <div className="flex items-center gap-4 my-4">
                    <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
                    <span className="px-2 text-gray-400 text-xs uppercase tracking-wide">
                        OR
                    </span>
                    <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="flex items-center justify-center">
                    <button
                        color="primary"
                        className="text-sm flex items-center justify-center gap-2 rounded-2xl px-5 py-1 border border-sky-500 hover:transform hover:scale-105 transition-transform duration-200 cursor-pointer text-gray-700 dark:text-gray-200"
                        onClick={() => handleGoogleLogin()}
                    >
                        <img src={GoogleIcon} alt="google" width={16} height={16} /> Sign in with Google
                    </button>
                </div>
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
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