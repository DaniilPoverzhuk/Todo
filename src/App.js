import React, { useState, useEffect } from "react";
import Form from "./components/Form/Form";
import ListTasks from "./components/ListTasks/ListTasks";
import ModalWindow from "./components/ModalWindow/ModalWindow";
import Overlay from "./components/Overlay/Overlay";
import Context from "./context";
import dayjs from "dayjs";

function App() {
  const [value, setValue] = useState({
    title: "",
    description: "",
    date: "",
    completed: false,
  });
  const [todo, setTodo] = useState([]);
  const [isModal, setModal] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [images, setImages] = useState([]);

  const changeHandler = (e) => {
    const files = Array.from(e.target.files);
    const validImageFiles = [];
    files.forEach((file) => validImageFiles.push(file));

    if (validImageFiles.length) setImageFiles(validImageFiles);
    return;
  };

  useEffect(() => {
    const images = [];
    const fileReaders = [];

    if (imageFiles.length) {
      imageFiles.forEach((file) => {
        const fileReader = new FileReader();
        fileReaders.push(fileReader);
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result) {
            images.push(result);
          }
          if (images.length === imageFiles.length) {
            setImages(images);
          }
        };
        fileReader.readAsDataURL(file);
      });
    }
    return () => {
      fileReaders.forEach((fileReader) => {
        if (fileReader.readyState === 1) {
          fileReader.abort();
        }
      });
    };
  }, [imageFiles]);

  const addTodo = (event) => {
    event.preventDefault();
    const getRandomID = () => Math.random() * 10000;

    const dateForm = () => dayjs(value.date);
    const now = () => dayjs();

    if (!now().isBefore(dateForm())) {
      alert("Вы ввели неверное значение");
      return;
    }

    const settimeout = setTimeout(() => {
      taskDone(getRandomID());
      return () => {
        clearInterval(settimeout);
      };
    }, dateForm().valueOf() - now().valueOf());

    const newItem = {
      title: value.title,
      description: value.description,
      date: value.date,
      completed: value.completed,
      id: getRandomID(),
    };

    const newTodo = [newItem, ...todo];

    setTodo(newTodo);
    setValue({
      title: "",
      description: "",
      date: "",
      id: "",
      completed: false,
    });
  };

  const deleteTodo = (id) => {
    setTodo(todo.filter((item) => item.id !== id));
  };

  const showModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const taskDone = (id) => {
    const newTodo = todo.map((item) => {
      if (item.id === id) {
        item.completed = true;
      }
      return item;
    });

    setTodo(newTodo);
  };

  return (
    <Context.Provider value={{ deleteTodo, showModal, taskDone }}>
      <div className="App">
        <Form
          value={value}
          onClick={addTodo}
          setValue={setValue}
          changeHandler={changeHandler}
        />
        <ListTasks todo={todo} />
        {isModal && <ModalWindow files={images} />}
        {isModal && <Overlay closeModal={closeModal} />}
      </div>
    </Context.Provider>
  );
}

export default App;
