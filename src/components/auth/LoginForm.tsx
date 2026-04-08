// import { Box, Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import {
    // Link,
    useNavigate 
} from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { loginUser } from '../../features/auth/authSlice';
import { showSnackbar } from '../../features/snackbar/snackbarSlice';

const LoginForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await dispatch(loginUser(values)).unwrap();
                dispatch(showSnackbar({ message: 'Login Successful', severity: 'success' }));
                navigate('/home', { replace: true });
            } catch {
                dispatch(showSnackbar({ message: 'Login failed. Please check your credentials and try again.', severity: 'error' }));
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="w-full">
            <form
                className='flex flex-col gap-4 w-full'
                autoComplete='off'
                onSubmit={formik.handleSubmit}
            >
                <div className='w-full'>
                    <input
                        name='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        placeholder='Email'
                        className={`border p-2 w-full rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className="text-red-500 text-sm">{formik.errors.email}</div>
                    )}
                </div>
                <div className='w-full'>
                    <input
                        name='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder='Password'
                        required
                        type='password'
                        className={`border p-2 w-full rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div className="text-red-500 text-sm">{formik.errors.password}</div>
                    )}
                </div>
                {/* <Link
                    to="/forgot-password"
                    className='text-sm text-blue-400 underline w-fit self-center'
                >
                    Forgot Password?
                </Link> */}
                <div className='flex justify-center'>
                    <button 
                        type='submit' 
                        disabled={formik.isSubmitting} 
                        className='text-white rounded-md px-5 py-1.5 hover:transform hover:scale-105 transition-all duration-200 cursor-pointer font-semibold shadow-md'
                        style={{ background: 'linear-gradient(90deg,#4f46e5,#6366f1)' }}
                    >
                        {formik.isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;
