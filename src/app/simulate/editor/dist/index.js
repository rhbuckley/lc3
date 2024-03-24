"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("@monaco-editor/react");
var react_2 = require("react");
var language_1 = require("./language");
var DocComponents_1 = require("~/components/DocComponents");
var simulation_1 = require("./simulation");
var Resizable_1 = require("~/components/Resizable");
var editoractions_1 = require("./editoractions");
var EDITORDEFAULT = "; LC3 Tools\n; -----------------------------\n; This project hopes to make\n; lives easier when working in\n; the LC3 Assembly language.\n\n.ORIG x3000\n\nLEA R0 mylabel ; load addr of mylabel\nPUTS           ; display r0\nHALT           ; halt the program\n\nmylabel: .STRINGZ \"welcome to lc3!\"\n\n.END\n\n; Some extra notes\n; -------------------------------\n; Powered by the same editor as VS Code\n;\n; The IDE is very opinionated\n; (my opinions, sorry).\n;   \"mylabel:\" is styled as a label\n;   \"mylabel\" would not be\n; the compiler does recognize either\n; way.\n;\n; Unlike some other online compilers,\n; this is very recent (March 2024),\n; and as much as I would like to say\n; that this is perfect, the possibility\n; for bugs does exist. If found, please\n; reach out to me at rhbuckley@uri.edu\n; or create a pull request at the repo\n; at https://github.com/rhbuckley/lc3\n;\n; When you press \"compile\", an error\n; message may display next to the button\n; or your message will be loaded into\n; the simulator. To see your raw code,\n; simply open the inspect element console.\n";
function LC3Editor(_a) {
    var editorRef = react_2.useRef(null);
    //1. Register the Custom LC3 Language'
    function handleEditorWillMount(monaco) {
        language_1.registerLC3Language(monaco);
    }
    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }
    return (React.createElement("div", { className: "h-screen flex flex-col bg-[#1e1e1e] relative sm:fixed right-0 sm:w-[48vw]" },
        React.createElement("div", { className: "px-5 pt-4 pb-8" },
            React.createElement(DocComponents_1.Content, { className: "text-white" },
                React.createElement("p", { className: "font-monsterrat text-2xl" },
                    React.createElement("strong", null, "LC3"),
                    " Code Editor"),
                React.createElement("p", null, "Write and simulate your LC-3 assembly code here. Simulation options are below."),
                React.createElement("p", { className: "hidden sm:block lg:hidden text-red-500" }, "Warning: Your screen is too small. The autocomplete hints in the editor may overflow."),
                React.createElement(editoractions_1.EditorActions, { editorRef: editorRef }))),
        React.createElement(Resizable_1.ResizablePanelGroup, { direction: "vertical" },
            React.createElement(Resizable_1.ResizablePanel, { defaultSize: 60 },
                React.createElement(react_1.Editor, { height: "100%", defaultLanguage: language_1.LC3LanguageID, defaultValue: EDITORDEFAULT, theme: "vs-dark", options: {
                        minimap: { enabled: false },
                        wordWrap: "on",
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        fixedOverflowWidgets: true
                    }, beforeMount: handleEditorWillMount, onMount: handleEditorDidMount })),
            React.createElement(Resizable_1.ResizableHandle, { withHandle: true }),
            React.createElement(Resizable_1.ResizablePanel, { defaultSize: 40 },
                React.createElement(simulation_1.Simulation, { initialCode: EDITORDEFAULT })))));
}
exports["default"] = LC3Editor;
