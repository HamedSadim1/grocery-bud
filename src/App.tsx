import { useState, useEffect } from "react";
import { ILIST, Errors } from "./types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Alert from "./components/Alert";
import List from "./components/List";

/**
 * Retrieves the list from the local storage.
 * If the list exists, it parses and returns it as an array.
 * If the list doesn't exist, it returns an empty array.
 * @returns {Array} The list retrieved from the local storage.
 */
const getLocalStorage = () => {
  const list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list") || "[]");
  } else {
    return [];
  }
};
/**
 * The main component of the Grocery Bud application.
 * Manages the state of the grocery list and provides functionality for adding, editing, and deleting items.
 */

function App() {
  const [name, setName] = useState<string>("");
  const [list, setList] = useState<ILIST[]>(getLocalStorage);
  const [edit, setEdit] = useState<boolean>(false);
  const [id, setId] = useState<string>("");

  // const [alert, setAlert] = useState<Errors>({
  //   show: false,
  //   msg: "",
  //   type: "",
  // });

  // useEffect hook is used to perform side effects in functional components.
  // It takes a callback function as the first argument and an array of dependencies as the second argument.
  // The callback function will be executed whenever the dependencies change.

  useEffect(() => {
    // When the 'list' variable changes, update the localStorage with the updated 'list' value.
    localStorage.setItem("list", JSON.stringify(list));

    // Retrieve the updated 'list' value from localStorage and update the 'local' state with it.
    // If there is no value in localStorage, default to an empty array.

    // The [list] dependency array ensures that this effect only runs when the 'list' variable changes.
    // If the 'list' variable remains the same, this effect will not be executed again.
  }, [list]);
  //This code block is using the useEffect hook to store and retrieve data from the browser's localStorage. It updates the localStorage whenever the list variable changes, and it also initializes the local state with the value from localStorage on component mount

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) {
      // display alert
      // showAlert(true, "danger", "please enter value");
      toast.error("Please enter value", {
        position: "top-center",
      });
    } else if (name && edit) {
      // deal with edit
      setList(
        list.map((item) => {
          if (item.id === id) {
            return { ...item, name };
          }
          return item;
        })
      );
      setName("");
      setEdit(false);
      setId("");
      // showAlert(true, "success", "value changed");
    } else {
      // show alert
      // showAlert(true, "success", "item added to the list");
      toast.success(`Item added to the list: ${name}`, {
        position: "top-center",
      });
      const newItem = { id: new Date().getTime().toString(), name };
      setList((items) => [...items, newItem]);

      setName("");
    }
  };

  const handleDelete = (id: string) => {
    // showAlert(true, "danger", "item removed");
    toast.error("Item removed", {
      position: "top-center",
    });

    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id: string) => {
    const specificItem = list.find((iteml) => iteml.id === id);
    setEdit(true);
    setId(id);
    setName(specificItem?.name || "");
  };

  // const showAlert = (
  //   show: boolean = false,
  //   type: string = "",
  //   msg: string = ""
  // ) => {
  //   setAlert({ show, type, msg });
  // };

  const clearList = () => {
    // showAlert(true, "danger", "empty list");
    toast.error("List is empty", {
      position: "top-center",
    });
    setList([]);
  };

  return (
    <>
      <ToastContainer />
      <section className="section-center">
        <form className="grocery-form" onSubmit={handleSubmit}>
          {/* {alert?.show && (
            <Alert alert={alert} showAlert={showAlert} list={list} />
          )} */}
          <h3>grocery bud</h3>
          <div className="form-control">
            <input
              type="text"
              className="grocery"
              placeholder="e.g. eggs"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit" className="submit-btn">
              {edit ? "edit" : "submit"}
            </button>
          </div>
        </form>
        {list.length > 0 && (
          <div className="grocery-container">
            <List
              items={list}
              handleDelete={handleDelete}
              handleEdit={editItem}
            />
            <button onClick={clearList} className="clear-btn">
              clear items
            </button>
          </div>
        )}
      </section>
    </>
  );
}

export default App;
