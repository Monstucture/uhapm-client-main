import { useState } from 'react';

export const useUserInfo = () => {
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        uhid: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevUserInfo => ({ ...prevUserInfo, [name]: value }));
    };

    return { userInfo, handleInputChange };
};