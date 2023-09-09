import React from "react";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import axios from "axios";


const List = ({ id, task, namein, setUpdateUI, updateMode }) => {

  const baseURL = "http://localhost:5001/api";

  const removeTask = () => {
    axios.delete(`${baseURL}/delete/${id}`).then((res) => {
      console.log(res);
      setUpdateUI((prevState) => !prevState);
    });
  };

  return (
    <li>
      {task}
      {namein}
      <div className="icon_holder">
        <BiEditAlt className="icon" onClick={() => updateMode(id, task)} />
        <BsTrash className="icon" onClick={removeTask} />
      </div>
    </li>
  );
};

export default List;