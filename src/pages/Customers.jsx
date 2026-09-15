import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Customers() {

    const [customers, setCustomers] = useState([]);

    const navigate = useNavigate();

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

            if (!response.ok) {
                alert("Unable to get customers");
                return;
            }

            setCustomers(data);

        } catch (error) {

            alert("Server error");

        }
    };

    useEffect(() => {
        getCustomers();
    }, []);

    return (
        <div className="min-h-screen bg-base-200 p-6">

            {/* Header */}

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">
                    Customers
                </h1>

                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/add-customer")}
                >
                    + Add Customer
                </button>

            </div>


            {/* Customer List */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                {customers.map((customer) => (

                    <div
                        key={customer._id}
                        className="card bg-base-100 shadow-xl"
                    >

                        <div className="card-body">

                            <h2 className="card-title">
                                {customer.name}
                            </h2>

                            <p>
                                📧 {customer.email}
                            </p>

                            <p>
                                📞 {customer.phone}
                            </p>

                            <p>
                                🏢 {customer.company}
                            </p>

                            <div className="badge badge-primary">
                                {customer.status}
                            </div>

                        </div>

                    </div>

                ))}

            </div>


            {/* Empty */}

            {customers.length === 0 && (

                <div className="text-center mt-10">

                    <p className="text-lg">
                        No customers found.
                    </p>

                </div>

            )}

        </div>
    );
}

export default Customers;