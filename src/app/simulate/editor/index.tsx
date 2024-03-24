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

const EDITORDEFAULT = `.ORIG x3000
LEA R0 mylabel
PUTS
HALT
mylabel: .STRINGZ "i (definitely) love physics"
.END`;

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
                    <Simulation />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
