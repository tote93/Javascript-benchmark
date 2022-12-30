import React from "react";
import MonacoEditor from "react-monaco-editor";

function Editor({ setCode, code, styling, className }) {
  const options = {
    /*   renderSideBySide: false, */
    selectOnLineNumbers: false,
    formatOnPaste: true,
    fontSize: 16,
    largeFileOptimizations: true,
    minimap: {
      enabled: false,
    },
    glyphMargin: false,
    folding: false,
    foldingStrategy: "auto",
    scrollBeyondLastLine: false,
    automaticLayout: true,
    wordWrap: "on",
    wordWrapColumn: 80,
    wordWrapMinified: true,
    wrappingIndent: "same",
    autoIndent: true,
    autoClosingBrackets: "always",
    autoClosingQuotes: "always",
    autoClosingOvertype: "always",
    autoSurround: "languageDefined",
    autoClosingDelete: "always",
    bracketPairColorization: true,
    cursorBlinking: "blink",
    cursorSmoothCaretAnimation: true,
    cursorStyle: "line",
    cursorWidth: 2,
    disableLayerHinting: false,
    disableMonospaceOptimizations: false,
    dragAndDrop: false,
    emptySelectionClipboard: true,
    fastScrollSensitivity: 5,
    ocurrencesHighlight: true,
    parameterHints: {
      enabled: true,
    },
    readOnly: false,
    resizeByContent: true,
  };
  return (
    <div style={styling}>
      <MonacoEditor className={className} language="javascript" theme="vs-dark" value={code} onChange={setCode} options={options} />
    </div>
  );
}

export default Editor;
