import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    const [customerCount, setCustomerCount] = useState(0);
    const [meetingCount, setMeetingCount] = useState(0);

    const getData = async () => {

        try {

            const customerResponse = await fetch(
                `${import.meta.env.VITE_API_URL}/customer/get`,
                {
                    method: "GET",
                    credentials: "include"
                }
            );

            const customers = await customerResponse.json();

            setCustomerCount(customers.length);


            const meetingResponse = await fetch(
                `${import.meta.env.VITE_API_URL}/meeting/get`,
                {
                    method: "GET",
                    credentials: "include"
                }
            );

            const meetings = await meetingResponse.json();

            setMeetingCount(meetings.length);

        } catch (error) {

            console.log(error);

        }
    };

    useEffect(() => {
        getData();
    }, []);


    const handleLogout = async () => {

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/user/logout`,
                {
                    method: "POST",
                    credentials: "include"
                }
            );

            if (response.ok) {
                navigate("/login");
            }

        } catch (error) {

            alert("Logout failed");

        }
    };


    return (
        <div className="min-h-screen bg-slate-950 text-white">

            {/* Navbar */}

            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-5 md:px-8">

                <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">

                        <span className="font-bold text-lg">
                            C
                        </span>

                    </div>

                    <div>

                        <h1 className="font-bold text-lg">
                            CRM
                        </h1>

                        <p className="text-xs text-slate-500">
                            Management System
                        </p>

                    </div>

                </div>


                <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition font-medium"
                >
                    Logout
                </button>

            </div>


            {/* Main */}

            <main className="p-5 md:p-8 max-w-7xl mx-auto">

                {/* Welcome */}

                <div className="mb-8">

                    <p className="text-indigo-400 text-sm font-medium">
                        Overview
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold mt-1">
                        Dashboard
                    </h2>

                    <p className="text-slate-400 mt-2">
                        Manage your customers and meetings from one place.
                    </p>

                </div>


                {/* Stats */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">

                    {/* Customers */}

                    <div className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/40 transition">

                        <div className="flex justify-between items-start">

                            <div>

                                <p className="text-slate-400 text-sm">
                                    Total Customers
                                </p>

                                <p className="text-4xl font-bold mt-2">
                                    {customerCount}
                                </p>

                            </div>

                            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xl">
                                👥
                            </div>

                        </div>

                        <p className="text-xs text-slate-500 mt-5">
                            Customers managed by you
                        </p>

                    </div>


                    {/* Meetings */}

                    <div className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-purple-500/40 transition">

                        <div className="flex justify-between items-start">

                            <div>

                                <p className="text-slate-400 text-sm">
                                    Total Meetings
                                </p>

                                <p className="text-4xl font-bold mt-2">
                                    {meetingCount}
                                </p>

                            </div>

                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-xl">
                                📅
                            </div>

                        </div>

                        <p className="text-xs text-slate-500 mt-5">
                            Scheduled meetings
                        </p>

                    </div>

                </div>


                {/* Management */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                    {/* Customer Management */}

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/40 transition">

                        <div className="flex items-center gap-4 mb-6">

                            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xl">
                                👥
                            </div>

                            <div>

                                <h3 className="text-xl font-semibold">
                                    Customer Management
                                </h3>

                                <p className="text-sm text-slate-500">
                                    Manage your customer records
                                </p>

                            </div>

                        </div>


                        <div className="flex flex-col sm:flex-row gap-3">

                            <button
                                className="flex-1 h-11 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition font-semibold shadow-lg shadow-indigo-600/10"
                                onClick={() => navigate("/customers")}
                            >
                                View Customers
                            </button>

                            <button
                                className="flex-1 h-11 rounded-xl border border-slate-700 hover:border-indigo-500 hover:bg-indigo-500/10 transition font-semibold text-slate-300"
                                onClick={() => navigate("/add-customer")}
                            >
                                + Add Customer
                            </button>

                        </div>

                    </div>


                    {/* Meeting Management */}

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-purple-500/40 transition">

                        <div className="flex items-center gap-4 mb-6">

                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-xl">
                                📅
                            </div>

                            <div>

                                <h3 className="text-xl font-semibold">
                                    Meeting Management
                                </h3>

                                <p className="text-sm text-slate-500">
                                    Schedule and track meetings
                                </p>

                            </div>

                        </div>


                        <div className="flex flex-col sm:flex-row gap-3">

                            <button
                                className="flex-1 h-11 rounded-xl bg-purple-600 hover:bg-purple-500 transition font-semibold shadow-lg shadow-purple-600/10"
                                onClick={() => navigate("/meetings")}
                            >
                                View Meetings
                            </button>

                            <button
                                className="flex-1 h-11 rounded-xl border border-slate-700 hover:border-purple-500 hover:bg-purple-500/10 transition font-semibold text-slate-300"
                                onClick={() => navigate("/add-meeting")}
                            >
                                + Schedule Meeting
                            </button>

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default Dashboard;

