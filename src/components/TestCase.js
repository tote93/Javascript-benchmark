import React, { useEffect, useState } from 'react'
import { FiPlay, FiTrash2, FiCopy, FiLoader } from 'react-icons/fi';
import Editor from './Editor';

function TestCase({ index, child, setChildName, copyTest, deleteTest, baseCode, forceRun }) {
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (forceRun) {
            executeCode();
        }
    }, [forceRun]);

    const setCode = (code) => {
        child.code = code;
    }
    const sleep = ms => new Promise(r => setTimeout(r, ms));

    const executeCode = async () => {
        /*         setIsRunning(true);
                try {
                    await sleep(3000);
        
                    console.log(eval(baseCode + child.code));
                } catch (error) {
                    console.log(error);
                }
                setIsRunning(false); */

    }

    return (

        <div key={child.id} style={{ width: "100%", marginTop: "1vh" }}>
            <div className="testHeader">
                <small className="testHeader-number">{index + 1}</small>
                <input className="testHeader-input" value={child.name} onChange={(e) => setChildName(child.id, e.target.value)} maxLength="30" />
                <div style={{ display: "flex", alignItems: "center", marginRight: 10 }}>
                    <span title="Run Test">
                        {isRunning ? <FiLoader className="actionIcons loadingSpinner" style={{ fontSize: 20, color: "rgba(255, 255, 255, 0.8)", marginRight: 20, cursor: "pointer" }} /> :
                            <FiPlay onClick={executeCode} className="actionIcons" style={{ fontSize: 20, color: "rgba(255, 255, 255, 0.8)", marginRight: 20, cursor: "pointer" }} />
                        }
                    </span>
                    <span title="Copy Test">
                        <FiCopy onClick={() => copyTest(child.id)} className="actionIcons" style={{ fontSize: 20, color: "rgba(255, 255, 255, 0.8)", marginRight: 20, cursor: "pointer" }} />
                    </span>
                    <span title="Remove Test">
                        <FiTrash2 onClick={() => deleteTest(child.id)} className="actionIcons" style={{ fontSize: 20, color: "rgba(255, 255, 255, 0.8)", cursor: "pointer" }} />
                    </span>
                </div>

            </div>
            <Editor code={child.code} setCode={setCode} styling={{ height: "5vh", width: "100%" }}></Editor>
        </div>

    )
}

export default TestCase