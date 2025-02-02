import React from "react";
import Footer from "./Footer";
import Header from "./Header";

function withLayout(WrappedComponent) {
  return function LayoutWrapper(props) {
    return (
      <div>
        <Header />
        <div className="flex flex-col min-h-screen relative mx-auto">
          <main className="flex-1 container mx-auto p-4 ">
            <WrappedComponent {...props} />
          </main>
          <Footer />
        </div>
      </div>
    );
  };
}

export default withLayout;
