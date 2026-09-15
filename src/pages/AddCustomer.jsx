import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function AddCustomer() {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit
    } = useForm();

    const onSubmit = async (data) => {

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/customer/create`,
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
                alert("Failed to add customer");
                return;
            }

            alert("Customer added successfully!");

            navigate("/customers");

        } catch (error) {

            alert("Server error");

        }
    };

    return (
        <div className="min-h-screen bg-base-200 flex justify-center p-6">

            <div className="card w-full max-w-lg bg-base-100 shadow-xl">

                <div className="card-body">

                    <h2 className="text-2xl font-bold">
                        Add Customer
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <input
                            type="text"
                            placeholder="Customer Name"
                            className="input input-bordered w-full mt-4"
                            {...register("name", { required: true })}
                        />

                        <input
                            type="email"
                            placeholder="Customer Email"
                            className="input input-bordered w-full mt-3"
                            {...register("email", { required: true })}
                        />

                        <input
                            type="text"
                            placeholder="Phone"
                            className="input input-bordered w-full mt-3"
                            {...register("phone")}
                        />

                        <input
                            type="text"
                            placeholder="Company"
                            className="input input-bordered w-full mt-3"
                            {...register("company")}
                        />

                        <select
                            className="select select-bordered w-full mt-3"
                            {...register("status")}
                        >
                            <option value="New">New</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>

                        <button
                            type="submit"
                            className="btn btn-primary w-full mt-5"
                        >
                            Add Customer
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default AddCustomer;