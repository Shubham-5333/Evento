import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { mockUser } from '../data/mockData';
import { User as UserIcon, Mail, Phone, MapPin, Camera, Save, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import type { Items } from '../types/index';


export const Profile: React.FC = () => {
  const [userData, setUserData] = useState<Items | null>(null);
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/api/auth",
          {
            withCredentials: true,
          }
        );
        console.log(response.data.user);


        setUserData(response.data.user);

        setPhone(response.data.user.phone ?? "");
        setCity(response.data.user.city ?? "");

        // setName(response.data.user.role);
        // setName(response.data.user.role);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);


  // const userData = {
  //   phone,
  //   city
  // }





  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        "http://localhost:2000/api/updateuser",
        {
          phone,
          city,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response.data);

      setSavedSuccess(true);

      setTimeout(() => {
        setSavedSuccess(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stitch-bg">
      <Header />

      <main className="flex-1 py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Account & Profile Settings
          </h1>
          <p className="text-sm font-medium text-slate-500">
            Manage your personal profile, contact information, and account preferences.
          </p>
        </div>

        {savedSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3 text-emerald-800 text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Profile information successfully updated!</span>
          </div>
        )}

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">

          {/* Avatar Section */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-slate-100">
            <div className="relative group">
              <img
                src={mockUser.avatar}
                alt={userData?.name}
                className="w-24 h-24 rounded-3xl object-cover border-2 border-blue-500 shadow-md"
              />
              <button className="absolute bottom-0 right-0 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition-transform group-hover:scale-105">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center sm:text-left space-y-1">
              <h3 className="text-xl font-bold text-slate-900">{userData?.name}</h3>
              <p className="text-xs text-slate-500 font-medium">Member since </p>
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full capitalize">
                Role: {userData?.role}
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Full Name</label>
                <div className="relative flex items-center">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5" />
                  <input
                    type="text"
                    value={userData?.name}
                    // onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl text-sm font-medium focus:outline-none text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Email Address</label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5" />
                  <input
                    type="email"
                    value={userData?.email}
                    // onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl text-sm font-medium focus:outline-none text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Phone Number</label>
                <div className="relative flex items-center">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl text-sm font-medium focus:outline-none text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">City / Location</label>
                <div className="relative flex items-center">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5" />
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter your city"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl text-sm font-medium focus:outline-none text-slate-900"
                  />
                </div>
              </div>



            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="btn-primary py-3 px-8 text-xs font-bold"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>

        </div>

      </main>

      <Footer />
    </div>
  );
};
