import { useState } from 'react';

export default function UTMLoginPage() {
  const [username, setUsername] = useState('mdasifmuntasir');
  const [password, setPassword] = useState('••••••••••');

  const handleLogin = () => {
    // Handle login logic here
    console.log('Login attempted with:', username);
  };

  return (
    // <div className="min-h-screen bg-linear-to-t from-yellow-400 to-burgundy-700 flex items-center justify-center p-4">
    <div className="w-full min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header with Logo */}
        <div className="p-6 flex flex-col items-center">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full bg-burgundy-700 flex items-center justify-center">
              <div className="text-yellow-400 text-2xl font-bold">FSES</div>
            </div>
            <div className="ml-4 text-4xl font-bold text-burgundy-700">
              UTM
            </div>
          </div>
          <div className="text-center mt-2">
            <h2 className="text-burgundy-700 text-lg font-bold">First Step Evaluation System</h2>
          </div>
        </div>

        {/* Session Timeout Alert */}
        {/* <div className="mx-6 mb-4 bg-red-100 border border-red-200 text-red-800 px-4 py-3 rounded">
          Your session has timed out. Please log in again.
        </div> */}

        {/* Login Form */}
        <div className="px-6 pb-6">
          <div className="mb-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-3 border border-gray-200 rounded focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-3 border border-gray-200 rounded focus:outline-none"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-burgundy-700 hover:bg-burgundy-800 text-white font-medium py-3 px-4 rounded focus:outline-none"
          >
            Log in
          </button>
          
          <div className="mt-4 text-center">
            <a className="text-burgundy-700 text-sm hover:underline cursor-pointer">Forgot password?</a>
          </div>
          
          {/* <div className="mt-6 text-right">
            <div className="text-burgundy-700 text-sm flex items-center justify-end ml-auto cursor-pointer">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
              </svg>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

// Adding custom styles for the UTM burgundy color
const style = document.createElement('style');
document.head.appendChild(style);
style.sheet.insertRule(`
  :root {
    --color-burgundy-700: #8E2246;
    --color-burgundy-800: #7D1D3F;
  }
`);
style.sheet.insertRule(`
  .text-burgundy-700 {
    color: #8E2246;
  }
`);
style.sheet.insertRule(`
  .bg-burgundy-700 {
    background-color: #8E2246;
  }
`);
style.sheet.insertRule(`
  .bg-burgundy-800 {
    background-color: #7D1D3F;
  }
`);
style.sheet.insertRule(`
  .hover\\:bg-burgundy-800:hover {
    background-color: #7D1D3F;
  }
`);