import React from 'react';

// Higher-Order Component
const withLayout = (WrappedComponent) => {
    return (props) => (
    <body className ="Root">
        <div className="Root">
            {children}
        </div> 
        <div className="relative">
            <div className="max-w-sm mx-auto bg-[red] min-h-screen">
                {/* Render the wrapped component and pass all props */}
                <WrappedComponent {...props} />

                {/* Fixed button at the bottom */}
                <div className="absolute bottom-0 h-[50px] flex items-center justify-center bg-black text-white">
                    Button
                </div>
            </div>
        </div>
    </body>
    );
};

export default withLayout;