"use client"
import Do from "@/components/do";
import { useEffect, useState } from "react";

export default function Home(){
  const [tasks, setTasks] = useState<string[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [darkMode, setDarkmode] = useState(false);

  const addDo = () => {
    if(inputVal.trim() === "") return;
    setTasks([...tasks, inputVal]);
    setInputVal(" ");
  }

  const deleteDo = (deleteId: number) => {
    setTasks(tasks.filter((_, i) => i !== deleteId));
  };

  const changeTheme = () => {
    const htmlClass = document.documentElement.classList;
    if(htmlClass.contains('dark')){
      htmlClass.remove('dark');
      setDarkmode(false);
    }else{
      htmlClass.add('dark');
      setDarkmode(true);
    }
  }

  return (
    <div id="background" className="bg-seaFoam text-deepWater container px-[360px] dark:text-pergament dark:bg-redWood h-screen">
      {/* хежер */}
      <header className="py-[20px] flex justify-between items-center">
        <h1 className="text-5xl font-bold">Список задач</h1>
        <button className="border-0 text-xl cursor-pointer dark:text-pergament" onClick={changeTheme}>Сменить тему</button>
      </header>
      <main>
        {/* инпут */}
        <div className="flex gap-[10px]">
          <input
            className="p-[10px] w-[100%] border-2"
            id="input"
            type="text"
            placeholder="write here..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <button
            className="p-[10px] bg-green-500 text-white rounded-md cursor-pointer dark:bg-leather"
            onClick={addDo}
          >
            Добавить
          </button>
        </div>
        {/* для задач */}
        <ul className="flex justify-center mt-4 space-y-2 flex-col">
          {tasks.map((task, index) => (
            <Do key={index} label={task} toDel={() => deleteDo(index)}/>
          ))}
        </ul>
      </main>
    </div>
  )
}
