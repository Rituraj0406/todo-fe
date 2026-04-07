// import { Box, Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { signupUser } from '../../features/auth/authSlice';
import { showSnackbar } from '../../features/snackbar/snackbarSlice';

const SignupForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
        }),
        // onSubmit: () => {}
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await dispatch(signupUser(values)).unwrap();
                navigate('/login');
            } catch {
                dispatch(showSnackbar({ message: 'Registration failed. Please try again.', severity: 'error' }));
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
                        id='name'
                        name='name'
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        placeholder='Enter name'
                        className={`border p-2 w-full rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {formik.touched.name && formik.errors.name && (
                        <div className="text-red-500 text-sm">{formik.errors.name}</div>
                    )}
                </div>
                <div className='w-full'>
                    <input
                        id='email'
                        name='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        placeholder='Enter email'
                        className={`border w-full p-2 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className="text-red-500 text-sm">{formik.errors.email}</div>
                    )}
                </div>
                <div className='w-full'>    
                    <input
                        id='password'
                        name='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        type='password'
                        placeholder='Enter password'
                        className={`border p-2 w-full rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div className="text-red-500 text-sm">{formik.errors.password}</div>
                    )}
                </div>
                <div>
                    <button type='submit' disabled={formik.isSubmitting} className='bg-sky-500 text-white rounded-md px-5 py-1 hover:transform hover:scale-105 transition-transform duration-200 cursor-pointer'>
                        {formik.isSubmitting ? 'Signing up...' : 'Sign Up'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SignupForm;
