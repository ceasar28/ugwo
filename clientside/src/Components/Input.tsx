import React from 'react';

interface InputProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
}

const Input: React.FC<InputProps> = ({ value, onChange, placeholder = '', type = 'text' }) => {
    return (
        <div>
            <input
                type={type}
                placeholder={placeholder}
                required
                value={value}
                onChange={onChange} 
                className="w-full h-[50px] rounded-lg border-2 border-solid border-black-400 outline-none pl-[1rem] mb-[1rem] font-Sora font-medium text-[14px] xs:text-[16px] bg-gray-200"
            />
        </div>
    );
};

export default Input;
