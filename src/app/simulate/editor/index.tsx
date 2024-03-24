"use client";

import { Editor, Monaco } from "@monaco-editor/react";
import { useRef } from "react";
import { LC3LanguageID, registerLC3Language } from "./language";
import { Content } from "~/components/DocComponents";
import { Simulation } from "./simulation";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "~/components/Resizable";
import { EditorActions } from "./editoractions";

const EDITORDEFAULT = `; LC3 Tools
; -----------------------------
; This project hopes to make
; lives easier when working in
; the LC3 Assembly language.

.ORIG x3000

LEA R0 mylabel ; load addr of mylabel
PUTS           ; display r0
HALT           ; halt the program

mylabel: .STRINGZ "welcome to lc3!"

.END

; Some extra notes
; -------------------------------
; Powered by the same editor as VS Code
;
; The IDE is very opinionated
; (my opinions, sorry).
;   "mylabel:" is styled as a label
;   "mylabel" would not be
; the compiler does recognize either
; way.
;
; Unlike some other online compilers,
; this is very recent (March 2024),
; and as much as I would like to say
; that this is perfect, the possibility
; for bugs does exist. If found, please
; reach out to me at rhbuckley@uri.edu
; or create a pull request at the repo
; at https://github.com/rhbuckley/lc3
;
; When you press "compile", an error
; message may display next to the button
; or your message will be loaded into
; the simulator. To see your raw code,
; simply open the inspect element console.
`;

interface EditorProps {}

export default function LC3Editor({}: EditorProps) {
    const editorRef = useRef(null);

    //1. Register the Custom LC3 Language'
    function handleEditorWillMount(monaco: Monaco) {
        registerLC3Language(monaco);
    }

    function handleEditorDidMount(editor: any, monaco: Monaco) {
        editorRef.current = editor;
    }

    return (
        <div className="h-screen flex flex-col bg-[#1e1e1e] relative sm:fixed right-0 sm:w-[48vw]">
            <div className="px-5 pt-4 pb-2">
                <Content className="text-white">
                    <p className="font-monsterrat text-2xl">
                        <strong>LC3</strong> Code Editor
                    </p>

                    <p>
                        Write and simulate your LC-3 assembly code here.
                        Simulation options are below.
                    </p>

                    <p className="hidden sm:block lg:hidden text-red-500">
                        Warning: Your screen is too small. The autocomplete
                        hints in the editor may overflow.
                    </p>

                    <EditorActions editorRef={editorRef} />
                </Content>
            </div>
            <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={60}>
                    <Editor
                        height="100%"
                        defaultLanguage={LC3LanguageID}
                        defaultValue={EDITORDEFAULT}
                        theme="vs-dark"
                        className="z-10"
                        options={{
                            minimap: { enabled: false },
                            wordWrap: "on",
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                            padding: { top: 16 },
                        }}
                        beforeMount={handleEditorWillMount}
                        onMount={handleEditorDidMount}
                    />
                </ResizablePanel>

                <ResizableHandle withHandle />

                {/* Simulation Options */}
                <ResizablePanel defaultSize={40}>
                    <Simulation initialCode={EDITORDEFAULT} />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
