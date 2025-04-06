import { useState } from "react";
import AddTask from "../../components/add-task";
import Button from "../../components/button";
import Card from "../../components/card";
import Header from "../../components/header";

const Home = () => {
  const [popUp, setPopUp] = useState(false);

  const handlePopUp = () => {
    setPopUp(true);
  };
  return (
    <section className="w-full h-full relative">
      <Header />
      <main className="w-full p-2 relative">
        <div className="w-fit my-1 float-end">
          <Button type="button" title="Add task" onClick={handlePopUp} />
        </div>
        <div className="w-full grid gap-2 grid-cols-1 md:grid-cols-4 lg:grid-cols-5 p-2">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </main>
      {popUp && (
        <div className="absolute h-screen w-full bg-slate-950/70 top-0 flex justify-center items-center">
          <div className="w-full md:w-1/2">
            <AddTask setPopUp={setPopUp} />
          </div>
        </div>
      )}
    </section>
  );
};

export default Home;
