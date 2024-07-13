import Navbar from "../navbar/Navbar";

function Home() {
  const user = localStorage.getItem("user");

  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-12 text-5xl text-blue-900 font-bold h-[100vh-12] md:text-7xl">
        Welcome {user}!
      </div>
    </>
  );
}

export default Home;
