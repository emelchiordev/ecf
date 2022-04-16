import React from "react";

function Icon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100">
            <defs>
                <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
                    <stop offset="0%" stopColor="rgba(14, 164, 122, 0)"></stop>
                    <stop offset="100%" stopColor="rgba(255, 255, 255, 1)"></stop>
                </linearGradient>
            </defs>
            <path
                fill="url(#sw-gradient)"
                stroke="url(#sw-gradient)"
                strokeWidth="0"
                d="M15.9-23.4c6 2.5 13.1 4.7 18.5 9.7C39.8-8.7 43.5-1 41.1 5c-2.3 5.9-10.7 10-16.3 16.6-5.6 6.6-8.4 15.8-13.5 17.8-5.2 1.9-12.8-3.3-19.4-7.3-6.5-4.1-12.1-6.9-15.3-11.4-3.2-4.5-4.2-10.5-4.3-16.3-.2-5.7.5-11.1 1.8-17.1 1.3-6 3.3-12.6 7.8-15.9 4.4-3.2 11.3-3.1 17.2-1.6 5.8 1.5 10.8 4.3 16.8 6.8z"
                transform="translate(50 50)"
                style={{
                    WebkitTransition: "all 0.3s ease 0s",
                    transition: "all 0.3s ease 0s",
                }}
            ></path>
        </svg>
    );
}

export default Icon;
