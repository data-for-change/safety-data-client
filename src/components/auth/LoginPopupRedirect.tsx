import React, { useEffect } from 'react';

const LoginPopupRedirect: React.FC = () => {
    useEffect(() => {
        // Send the success message to the original window (opener)
        if (window.opener) {
            window.opener.postMessage('login-success', window.location.origin);
        }

        // Close the popup after a brief delay
        const timer = setTimeout(() => {
            window.close();
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            fontFamily: 'sans-serif'
        }}>
            <h4>עוד רגע... מתחברים</h4>
        </div>
    );
};

export default LoginPopupRedirect;
