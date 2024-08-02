import { useContext } from "react";
import Navbar from "../navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-12 text-5xl text-blue-900 font-bold h-[100vh-12] md:text-7xl">
        Welcome {user}
      </div>
    </>
  );
}

export default Home;
