import React from "react";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-sans">
      <header className="bg-blue-500 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold">Your Brand</h1>
          <p className="mt-2">A brief tagline or description</p>
        </div>
      </header>

      <section className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Welcome to Your Brand</h2>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Sed cursus ante dapibus diam.
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600">
            Get Started
          </button>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Your Brand. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
