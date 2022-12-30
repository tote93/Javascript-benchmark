import React, { useEffect, useState } from "react";
import "./App.css";
import Button from "./components/Button";
import Editor from "./components/Editor";
import { FiPlay, FiPlus, FiSettings, FiSave } from 'react-icons/fi';
import TestCase from "./components/TestCase";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [code, setCode] = useState("const data = [...Array(1000).keys()];");
  const [childs, setChilds] = useState([]);
  const [runAllTests, setRunAllTests] = useState(false);
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then((registration) => {
            console.log('Service worker registrado con éxito: ', registration);
          })
          .catch((error) => {
            console.log('Error al registrar el service worker: ', error);
          });
      });
    }
    setChilds([{
      id: uuidv4(),
      name: `Test Case`,
      code: "data.find((item) => item === 900);",
      result: null,
      status: "stopped",
    }])
  }, []);
  useEffect(() => {
    //console.log({ effect: childs })
  }, [childs]);

  const evaluateCode = () => {
    try {
      console.log(eval(code))
    } catch (error) {
      console.log(error);
    }
  };
  const setChildName = (id, name) => {
    // 1. Make a shallow copy of the items
    let items = [...childs];
    // 2. Make a shallow copy of the item you want to mutate
    let item = { ...items.find((item) => item.id === id) };
    // 3. Replace the property you're intested in
    item.name = name;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, 
    //    but that's why we made a copy first
    items[items.findIndex((item) => item.id === id)] = item;
    // 5. Set the state to our new copy
    setChilds(items);
  }

  const addNewTest = () => {
    setChilds([...childs, {
      id: uuidv4(),
      name: `Test Case`,
      code: "",
      result: null,
      status: "stopped",
    }])
    navigator.serviceWorker.getRegistration()
      .then((registration) => {
        registration.active.postMessage('Hola, soy un mensaje desde la aplicación de React', {
          data: 1
        });
      });
  }

  const copyTest = (id) => {
    let items = [...childs];
    let item = { ...items.find((item) => item.id === id) };
    item.id = uuidv4();
    items.push(item);
    setChilds(items);
  }
  const deleteTest = (id) => {
    let items = [...childs];
    let index = items.findIndex((item) => item.id === id);
    items.splice(index, 1);
    setChilds(items);
  }
  const playAllTests = () => {
    setRunAllTests(true);

  }

  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", height: "100vh" }} >
      {/* Left part */}
      <div style={{ padding: 50, width: "50%", background: "#2F3037", height: "100%", overflow: "auto" }}>
        <div style={{ display: "flex", width: "100%", justifyContent: "space-between", marginBottom: "1rem" }}>
          <Button text="Run All Tests" className="runTests" icon={<FiPlay style={{ fontSize: 30 }} />} onClick={playAllTests}></Button>
          <div style={{ display: "flex" }}>
            <Button text="" className="saveButton" icon={<FiSave style={{ fontSize: 30 }} />}></Button>
            <Button text="" className="settingsButton" icon={<FiSettings style={{ fontSize: 30 }} />}></Button>
          </div>
        </div>
        <Editor className="mainEditor" code={code} setCode={setCode} styling={{ height: "20vh", width: "100%", borderRadius: "20px" }}></Editor>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1vh" }}>
          <Button text="Add Test Case" onClick={addNewTest} className="addTestCase" icon={<FiPlus style={{ fontSize: 30 }} />}></Button>
        </div>
        {childs.map((child, i) => {
          return (
            <TestCase key={child.id} forceRun={runAllTests} index={i} baseCode={code} child={child} setChildName={setChildName} copyTest={copyTest} deleteTest={deleteTest}></TestCase>
          );
        })}

      </div>
      {/* Right part */}
      {/*   <div style={{ width: "50%", background: "#25262A" }}>
        <div style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
          <button>test</button>
        </div>
        <Editor code={code} setCode={setCode}></Editor>
        <button onClick={evaluateCode}>Evaluate Code</button>
      </div> */}
    </div >
  );
}
export default App;
