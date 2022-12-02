import React, { useContext } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FaGooglePlus, FaGithub } from "react-icons/fa";
import { AuthContext } from '../../contexts/AuthProvider';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { Toaster, toast } from 'react-hot-toast';
import useTitle from '../../Hooks/useTitle';

const Login = () => {
    useTitle('Login')
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const { providerLogin, signIn } = useContext(AuthContext);

    /*     
        const location = useLocation();
        const navigate = useNavigate();
        const from = location?.state?.from?.pathname || '/'; 
    */

    const handleGoogleLogin = () => {
        providerLogin(googleProvider)
            .then(result => {
                const user = result.user;
                if (user.uid) {
                    fetch('https://carx-delta.vercel.app/user', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(user)
                    })
                        .then(res => res.json())
                        .then(data => {
                            window.location = '/';
                        })
                }

                fetch(`https://carx-delta.vercel.app/jwt?email=${user.email}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.accessToken) {
                            localStorage.setItem('carx', data.accessToken);

                            window.location = '/';

                            toast.success('Successfully Logged In!');
                        }
                    })

            })
            .catch(error => {
                return toast.error(error.message)
            })
    }

    const handleGithubLogin = () => {
        providerLogin(githubProvider)
            .then(result => {
                toast.success('Successfully Logged In!');
                const user = result.user;
                if (user.uid) {
                    fetch('https://carx-delta.vercel.app/user', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(user)
                    })
                        .then(res => res.json())
                        .then(data => {
                            window.location = '/';
                        })
                }
                fetch(`https://carx-delta.vercel.app/jwt?email=${user.email}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.accessToken) {
                            localStorage.setItem('carx', data.accessToken);

                            window.location = '/';

                            toast.success('Successfully Logged In!');
                        }
                    })
            })
            .catch(error => toast.error(error.message))
    }

    const loginHandler = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                toast.success('Successfully Logged In!');
                const user = result.user;

                if (user.uid) {
                    fetch('https://carx-delta.vercel.app/user', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(user)
                    })
                        .then(res => res.json())
                        .then(data => {
                            window.location = '/';
                        })
                }

                fetch(`https://carx-delta.vercel.app/jwt?email=${user.email}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.accessToken) {
                            localStorage.setItem('carx', data.accessToken);

                            window.location = '/';

                            form.reset()

                            toast.success('Successfully Logged In!');
                        }
                    })

            })
            .catch(error => toast.error(error.message))
    }

    return (
        <>
            <Toaster></Toaster>
            <div className="flex justify-center mt-28">
                <div className="flex flex-col justify-center items-center md:flex-row shadow rounded-xl max-w-7xl w-[90%] m-2">
                    <div className="w-full md:w-3/4">
                        <div className="text-xl flex flex-col justify-center items-center mt-5 md:mt-0 py-4">
                            <h1 className="font-semibold text-xl md:text-5xl text-gray-600 m-2">Login to your account</h1>
                            <h1 className="text-sm font-medium text-gray-600 m-2">Login using Social accounts</h1>
                            <div className="text-lg lg:text-xl text-center space-x-5 m-2">
                                <button onClick={handleGoogleLogin} className='bg-blue-500 text-white p-2'>
                                    <FaGooglePlus></FaGooglePlus>
                                </button>
                                <button onClick={handleGithubLogin} className='bg-blue-500 text-white p-2'>
                                    <FaGithub></FaGithub>
                                </button>
                            </div>
                            <h1 className="text-sm font-medium text-gray-600 m-2">OR</h1>
                        </div>
                        <form onSubmit={loginHandler} className="flex flex-col justify-center items-center m-2 space-y-6 md:space-y-8">
                            <div className="">
                                <input
                                    type="text"
                                    name='email'
                                    placeholder="Email Address..."
                                    className="bg-gray-100 rounded-lg px-5 py-2 focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                                />
                            </div>
                            <div className="">
                                <input
                                    type="password"
                                    name='password'
                                    placeholder="Password..."
                                    className="bg-gray-100 rounded-lg px-5 py-2 focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                                />
                            </div>
                            <div className="text-center mt-7">
                                <button className="px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md text-white bg-gradient-to-l from-blue-400 to-emerald-400 font-medium m-2 mb-1">Sign In</button>
                            </div>
                            <div className='mb-6'>
                                <p>Already have an account ? <Link to='/register' className='text-blue-500'>Sign Up</Link></p>
                            </div>
                        </form>
                    </div>
                    <div className="h-[100%] w-full md:w-1/3 bg-gradient-to-l from-blue-400 to-emerald-400 items-center flex justify-center">
                        <div className="text-white text-base font-semibold text-center my-10 space-y-2 m-2">
                            <h1 className="text-5xl">New Here?</h1>
                            <h1 className="pb-3">Sign Up to discover more about my service!</h1>
                            <Link to='/register' className="bg-white rounded-2xl px-4 text-emerald-400 py-1">SignUp</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;