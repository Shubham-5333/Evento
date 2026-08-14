import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Calendar, Mail, Lock, LogIn } from 'lucide-react';
// import Google from '../assets/google-logo-removebg-preview.png'
import Google from '../assets/google-removebg-preview.png'
import axios from 'axios';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    }
    
    
    const postData = async () => {
      try {
        const response = await axios.post('http://localhost:2000/api/login', userData,{withCredentials:true})
        console.log(response);
        navigate('/')

      } catch (error) {
        console.log(error);
      }
    }
    postData()
  };

  return (
    <div className="min-h-screen flex flex-col bg-stitch-bg">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-blue-500/5">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white mx-auto shadow-md shadow-blue-500/20">
              <Calendar className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Welcome Back to Evento
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Sign in to manage your ticket bookings and saved events.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-sm font-medium focus:outline-none transition-all text-slate-900"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs font-bold text-blue-600 hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-sm font-medium focus:outline-none transition-all text-slate-900"
                />
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full btn-primary py-3 text-sm font-bold shadow-md shadow-blue-600/20"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          </form>

          {/* Social Signin Alternative */}
          <div className="pt-4 border-t border-slate-100 text-center space-y-4">
            {/* <p className="text-xs text-slate-500 font-medium">Or continue with</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => navigate('/my-bookings')}
                className="btn-outline text-xs py-2 justify-center w-100"
              >
                <img className='w-14' src={Google}/>
              </button>
            </div> */}
            
            <p className="text-xs text-slate-600 font-medium pt-2">
              Don't have an account?{' '}
              <Link to="/register" className="font-bold text-blue-600 hover:underline">
                Create one now
              </Link>
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};
