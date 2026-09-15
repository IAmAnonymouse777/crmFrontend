import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Meetings() {

    const [meetings, setMeetings] = useState([]);

    const navigate = useNavigate();

    const getMeetings = async () => {

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/meeting/get`,
                {
                    method: "GET",
                    credentials: "include"
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert("Unable to get meetings");
                return;
            }

            setMeetings(data);

        } catch (error) {

            alert("Server error");

        }
    };

    useEffect(() => {
        getMeetings();
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6 md:p-8">

            {/* Header */}

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">

                <div>

                    <p className="text-indigo-400 text-sm font-medium mb-1">
                        CRM Management
                    </p>

                    <h1 className="text-3xl md:text-4xl font-bold">
                        Meetings
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Manage and track your scheduled meetings.
                    </p>

                </div>


                <button
                    className="h-11 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition shadow-lg shadow-indigo-600/20"
                    onClick={() => navigate("/add-meeting")}
                >
                    + Schedule Meeting
                </button>

            </div>


            {/* Meeting List */}

            {meetings.length > 0 ? (

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

                    {meetings.map((meeting) => (

                        <div
                            key={meeting._id}
                            className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-950/20 transition duration-300"
                        >

                            {/* Title */}

                            <div className="flex justify-between items-start gap-3">

                                <div>

                                    <h2 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition">
                                        {meeting.title}
                                    </h2>

                                    <p className="text-slate-400 text-sm mt-1">
                                        {meeting.customer?.name || "Unknown Customer"}
                                    </p>

                                </div>


                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                    {meeting.status}
                                </span>

                            </div>


                            {/* Meeting Details */}

                            <div className="mt-6 space-y-4">

                                <div className="flex items-center gap-3">

                                    <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center">
                                        📅
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-500">
                                            Date
                                        </p>

                                        <p className="text-sm text-slate-200">
                                            {new Date(meeting.date).toLocaleDateString()}
                                        </p>
                                    </div>

                                </div>


                                <div className="flex items-center gap-3">

                                    <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center">
                                        🕐
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-500">
                                            Time
                                        </p>

                                        <p className="text-sm text-slate-200">
                                            {meeting.time}
                                        </p>
                                    </div>

                                </div>


                                <div className="flex items-center gap-3">

                                    <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center">
                                        ⏱
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-500">
                                            Duration
                                        </p>

                                        <p className="text-sm text-slate-200">
                                            {meeting.duration} minutes
                                        </p>
                                    </div>

                                </div>

                            </div>


                            {/* Bottom */}

                            <div className="mt-6 pt-5 border-t border-slate-800 flex justify-between items-center">

                                <span className="text-sm text-slate-400">
                                    {meeting.type}
                                </span>

                                <span className="text-xs text-slate-500">
                                    {meeting.notes || "No notes"}
                                </span>

                            </div>

                        </div>

                    ))}

                </div>

            ) : (

                /* Empty State */

                <div className="min-h-[400px] flex items-center justify-center">

                    <div className="text-center">

                        <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-2xl mb-5">
                            📅
                        </div>

                        <h2 className="text-xl font-semibold">
                            No meetings found
                        </h2>

                        <p className="text-slate-500 mt-2">
                            You haven't scheduled any meetings yet.
                        </p>

                        <button
                            className="mt-5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition font-medium"
                            onClick={() => navigate("/add-meeting")}
                        >
                            Schedule Your First Meeting
                        </button>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Meetings;

