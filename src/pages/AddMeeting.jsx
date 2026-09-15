import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function AddMeeting() {

    const [customers, setCustomers] = useState([]);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit
    } = useForm();

    const getCustomers = async () => {

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/customer/get`,
                {
                    method: "GET",
                    credentials: "include"
                    
                }
            );

            const data = await response.json();

            if (response.ok) {
                setCustomers(data);
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCustomers();
    }, []);

    const onSubmit = async (data) => {

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/meeting/create`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify(data)
                }
            );

            const result = await response.json();

            if (!response.ok) {
                alert("Failed to create meeting");
                return;
            }

            alert("Meeting scheduled successfully!");

            navigate("/meetings");

        } catch (error) {

            alert("Server error");

        }
    };

    return (
        <div className="min-h-screen bg-base-200 flex justify-center p-6">

            <div className="card w-full max-w-lg bg-base-100 shadow-xl">

                <div className="card-body">

                    <h2 className="text-2xl font-bold">
                        Schedule Meeting
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* Customer */}

                        <select
                            className="select select-bordered w-full mt-4"
                            {...register("customer", { required: true })}
                        >

                            <option value="">
                                Select Customer
                            </option>

                            {customers.map((customer) => (

                                <option
                                    key={customer._id}
                                    value={customer._id}
                                >
                                    {customer.name}
                                </option>

                            ))}

                        </select>


                        {/* Title */}

                        <input
                            type="text"
                            placeholder="Meeting Title"
                            className="input input-bordered w-full mt-3"
                            {...register("title", { required: true })}
                        />


                        {/* Date */}

                        <input
                            type="date"
                            className="input input-bordered w-full mt-3"
                            {...register("date", { required: true })}
                        />


                        {/* Time */}

                        <input
                            type="time"
                            className="input input-bordered w-full mt-3"
                            {...register("time", { required: true })}
                        />


                        {/* Duration */}

                        <input
                            type="number"
                            placeholder="Duration (minutes)"
                            className="input input-bordered w-full mt-3"
                            {...register("duration")}
                        />


                        {/* Type */}

                        <select
                            className="select select-bordered w-full mt-3"
                            {...register("type")}
                        >

                            <option value="Online">
                                Online
                            </option>

                            <option value="Offline">
                                Offline
                            </option>

                        </select>


                        {/* Status */}

                        <select
                            className="select select-bordered w-full mt-3"
                            {...register("status")}
                        >

                            <option value="Scheduled">
                                Scheduled
                            </option>

                            <option value="Completed">
                                Completed
                            </option>

                            <option value="Cancelled">
                                Cancelled
                            </option>

                        </select>


                        {/* Notes */}

                        <textarea
                            placeholder="Meeting Notes"
                            className="textarea textarea-bordered w-full mt-3"
                            {...register("notes")}
                        />


                        <button
                            type="submit"
                            className="btn btn-secondary w-full mt-5"
                        >
                            Schedule Meeting
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default AddMeeting;