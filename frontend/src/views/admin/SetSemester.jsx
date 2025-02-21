import React, { useState } from 'react';
import AdminHeader from "../../components/header/admin/AdminHeader";
// import { useHistory } from 'react-router-dom';

const SetSemester = ({ setAvailableSemesters }) => {
    const [selectedSemesters, setSelectedSemesters] = useState({
        firstSemester: false,
        secondSemester: false,
    });

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setSelectedSemesters((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
        // Update available semesters
        setAvailableSemesters({
            firstSemester: selectedSemesters.firstSemester,
            secondSemester: selectedSemesters.secondSemester,
        });
    };

    return (
        <div className='w-full h-full'>
            <div className='w-full h-screen overflow-y-hidden flex'>
                <AdminHeader />
                <div className='p-8 flex flex-col'>
                    <h2 className='text-xl font-bold mb-4'>Set Active Semester</h2>
                    <div className='flex flex-col space-y-2'>
                        <label className='flex items-center'>
                            <input
                                type='checkbox'
                                name='firstSemester'
                                checked={selectedSemesters.firstSemester}
                                onChange={handleCheckboxChange}
                                className='mr-2'
                            />
                            First Semester
                        </label>
                        <label className='flex items-center'>
                            <input
                                type='checkbox'
                                name='secondSemester'
                                checked={selectedSemesters.secondSemester}
                                onChange={handleCheckboxChange}
                                className='mr-2'
                            />
                            Second Semester
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SetSemester;
