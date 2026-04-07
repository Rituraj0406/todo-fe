import {useEffect} from 'react';
// import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SignupForm from '../../components/auth/SignUpForm';
import { 
  Link, 
  useNavigate 
} from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';

const Signup = () => {
  const user = useAppSelector(state => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/home', { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="flex items-center gap-2 mb-6">
        {/* <AccountBalanceWalletIcon fontSize="large" /> */}
        <h1 className="font-mono text-black dark:text-white font-extrabold text-2xl uppercase">TODO TASK</h1>
      </div>
      <div className="w-full max-w-md shadow-lg shadow-blue-400/20 dark:shadow-blue-900/40 p-6 rounded-xl flex flex-col gap-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
        <SignupForm />
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
