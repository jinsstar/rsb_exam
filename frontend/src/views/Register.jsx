

// Trial and error
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { SiMinutemailer } from "react-icons/si";

const Register = () => {
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState(''); // Store the original email here
  const [maskedEmail, setMaskedEmail] = useState(''); // Masked email for display
  const [isVerified, setIsVerified] = useState(false);
  const [message, setMessage] = useState('');

  const handleValidate = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/validate-student-id', { studentId });
      const { email, verified } = response.data;
  
      if (email) {
        setEmail(email); // Store the original email for sending it back to the backend
        const maskedEmail = `${email[0]}${'*'.repeat(email.length - 3)}${email.slice(-2)}`;
        setMaskedEmail(maskedEmail); // Masked email for user display
        setIsVerified(verified);
  
        if (verified) {
          setMessage('Account is already registered.');
        } else {
          setMessage('Account is not verified. Please check your email.');
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMessage('Invalid Student_ID'); // Display the specific message for invalid student ID
      } else {
        console.error('Error validating student ID:', error);
        setMessage('An error occurred while validating.');
      }
    }
  };
  

  const handleSendVerificationEmail = async () => {
    try {
      if (!isVerified && email) {
        console.log('Sending POST request to /send-verification-email with:', email);
        await axios.post('http://localhost:8000/api/send-verification-email', { email });
        setMessage('Verification email sent successfully.');
      } else {
        setMessage('No valid email available for verification.');
      }
    } catch (error) {
      console.error('Error sending verification email:', error);
      setMessage('Failed to send verification email.');
    }
  };
  

  return (
    <div className="w-full h-full">
      <div className="flex flex-col justify-center items-center w-full h-screen">
        <div className="mb-4 w-full flex justify-center items-center">
          <input
            type="text"
            placeholder="Student ID"
            maxLength={10}
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="outline-1 outline-slate-300 outline rounded-lg p-2 w-44"
          />
          <button
            onClick={handleValidate}
            className="ml-2 bg-green-500 hover:bg-blue-500 transition duration-300 text-white p-2 rounded-lg"
          >
            Validate
          </button>
        </div>

        {maskedEmail && (
          <div className="w-1/2 bg-slate-200 p-4 rounded-lg">
            <div className="flex flex-col items-center justify-center">
              <p className="animate-pulse">
                <SiMinutemailer color='green' size={100} />
              </p>
              <p className="flex mb-2 gap-1">
                <strong>Email:</strong> {maskedEmail} {/* Display masked email */}
              </p>
            </div>
            {!isVerified && (
              <button
                onClick={handleSendVerificationEmail}
                className="mt-4 bg-green-500 w-1/2 hover:bg-blue-500 transition duration-200 text-white p-2 rounded-lg"
              >
                Send Verification Email
              </button>
            )}
          </div>
        )}

        {message && <p className="mt-4 text-red-500">{message}</p>}

        <div className='w-full flex justify-center -mt-3 mb-3'>
          <p className='flex justify-center items-center text-xs ml-20'>Already have an Account?</p>
          <Link to="/">
            <p className='flex justify-center hover:text-blue-500 text-xs'>Login</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
