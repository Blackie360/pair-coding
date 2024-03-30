import React from 'react'

const Home = () => {
  return (
    <div className="bg-cover bg-center rounded-lg min-h-screen" style={{ backgroundImage: 'url(/images/hero-background.png)' }}>
      <div className="bg-black bg-opacity-50 min-h-screen flex justify-center items-center">
        <div className="bg-white rounded-lg p-8 max-w-md">
          <header className="text-white py-4">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl font-bold">Code Buddy</h1>
              <p className="text-sm">Find your perfect coding partner</p>
            </div>
          </header>
          <section className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Connect with a coding buddy</h2>
            <p className="text-lg text-black">"Coding as a pair is like solving a mystery together. Debugging isn't just about fixing errors; it's about uncovering the story behind the code."</p>

          </section>
        </div>
      </div>
    </div>
  )
}

export default Home
