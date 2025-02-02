import React from "react";
import Footer from "./Footer";
import Header from "./Header";

function withLayout(WrappedComponent) {
  return function LayoutWrapper(props) {
    return (
      <div>
        <Header />
        <div className="flex flex-col min-h-screen relative mx-auto">
          <main className="container mx-auto p-4 pb-20">
            <WrappedComponent {...props} />
          </main>
          <Footer />
        </div>
      </div>
    );
  };
}

export default withLayout;
