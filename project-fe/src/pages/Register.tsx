import { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../components/InputField";
import { RegisterUser } from "../models/User";
import { register } from "../services/authService";

const Register = () => {
    const [form, setForm] = useState<RegisterUser>({
        firstName: "",
        lastName: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            alert("Mật khẩu không trùng");
            return;
        }
        try {
            const { token } = await register(form);
            localStorage.setItem("token", token);
            alert("Đăng ký thành công!");
        } catch (error: any) {
            alert(error.response?.data?.message || "Đăng ký thất bại");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký</h2>

                <InputField
                    label="First Name"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                />
                <InputField
                    label="Last Name"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                />
                <InputField
                    label="Phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                />
                <InputField
                    label="Password"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                />
                <InputField
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                >
                    Đăng ký
                </button>

                <p className="mt-4 text-center text-sm">
                    Đã có tài khoản?{" "}
                    <Link to="/" className="text-blue-500 hover:underline">
                        Đăng nhập
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;