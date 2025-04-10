import { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../components/InputField";
import { LoginUser } from "../models/User";

const Login = () => {
    const [form, setForm] = useState<LoginUser>({ phone: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e?.target.name]: e?.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Logging in with:", form);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>

                <InputField
                    label="Số điện thoại"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                />
                <InputField
                    label="Mật khẩu"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Đăng nhập
                </button>

                <p className="mt-4 text-center text-sm">
                    Chưa có tài khoản?{" "}
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Đăng ký
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
