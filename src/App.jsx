import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import TodoWrapper from "./components/TodoWrapper";

const App = () => {
  return (
    <div className="my-10">
      <Navbar />
      <div className="container mx-auto bg-gradient-to-t from-gray-900 to-teal-800 min-h-screen text-xl text-gray-100 flex flex-col py-10">
        <TodoWrapper />
      </div>
      <Footer />
    </div>
  );
};

export default App;
