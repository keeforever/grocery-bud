import { useState, useEffect } from "react";
import ListItems from "./components/ListItems";

function App() {
  const [itemValue, setItemvalue] = useState("");

  // list Items
  const [listItems, setlistItems] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState("");
  const [alertInfo, setAlertInfo] = useState({});

  // input handler
  const inputHandler = (e) => {
    setItemvalue(e.target.value);
  };

  // item Submit
  const itemSubmit = (e) => {
    e.preventDefault();
    if (itemValue === "") {
      setAlertInfo({
        state: true,
        info: "Enter The Value!!!",
        color: "#f39393",
      });
      return;
    }

    if (!isEdit) {
      const random = Math.floor(Math.random() * 1000);
      setlistItems([...listItems, { text: itemValue, id: random }]);
      setAlertInfo({
        state: true,
        info: "Item Added To the List.",
        color: "#6be675",
      });
      setItemvalue("");
      return;
    }
    setIsEdit(!isEdit);
    const tempArr = listItems;
    let change = tempArr[editIndex];
    change.text = itemValue;
    setlistItems(tempArr);
    setAlertInfo({
      state: true,
      info: "Item Value was Changed.",
      color: "#6be675",
    });
    setItemvalue("");
  };

  // Delete item
  const onDelete = (id) => {
    const newItemList = listItems.filter((list) => list.id !== id);
    setAlertInfo({ state: true, info: "Item Was Deleted.", color: "#f39393" });
    setlistItems(newItemList);
  };

  // Edit item
  const onEdit = (tid) => {
    setIsEdit(!isEdit);
    const newItemList = listItems.filter((list) => list.id === tid);
    const [{ text, id }] = newItemList;
    const index = listItems.findIndex((item) => item.id === id);
    setItemvalue(text);
    setEditIndex(index);
  };

  // Local Storage
  const localSave = () => {
    if (JSON.parse(localStorage.getItem("list")).length > 0) {
      setlistItems(JSON.parse(localStorage.getItem("list")));
    } else {
      setlistItems([]);
    }
  };

  useEffect(() => {
    localSave();
  }, []);

  // useEffect
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(listItems));
    console.log(JSON.parse(localStorage.getItem("list")));
    const errAlert = setTimeout(() => {
      setAlertInfo({ state: false, info: "" });
    }, 2000);
    return () => {
      clearTimeout(errAlert);
    };
  }, [alertInfo.state]);

  return (
    <main>
      <section className="app-container">
        <header className="head">
          <div
            className="alerts"
            style={{
              opacity: `${alertInfo.state ? "1" : "0"}`,
              backgroundColor: alertInfo.color,
            }}
          >
            {alertInfo.info}
          </div>
          <h1 className="title">Grocery Bud</h1>
          <form className="form-control" onSubmit={itemSubmit}>
            <input
              type="text"
              className="form-input"
              placeholder="e.g.egg"
              value={itemValue === "" ? "" : itemValue}
              onChange={inputHandler}
            />
            <button type="submit" className="form-submit">
              {!isEdit ? "Submit" : "Edit"}
            </button>
          </form>
        </header>
        <ListItems lists={listItems} onDelete={onDelete} onEdit={onEdit} />
        <div className="clear_btn-container">
          {listItems.length > 0 && (
            <button
              className="btn-clear_all"
              onClick={() => {
                setlistItems([]);
                localStorage.setItem("list", JSON.stringify([]));
              }}
            >
              Clear Items
            </button>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
