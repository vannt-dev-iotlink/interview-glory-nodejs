import React from "react";

interface InputFieldProps {
    label: string
    type?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    name: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type = "text", value, onChange, name }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
        </div>
    );
};

export default InputField;
