import { useReactFlow } from "reactflow";
import { Editor, EditorState } from "draft-js";
import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";

export const NoteNode = ({ id, data }) => {
  const instance = useReactFlow();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  return (
    <div className="outline outline-0 hover:outline-4 transition-all duration-100 outline-node-secondary bg-node-bg shadow-md h-auto w-auto text-xs flex flex-col justify-between">
      {/* ==================== Delete Node =================== */}
      <span
        title="Delete"
        className="z-20 text-gray-500 hover:text-red-500 absolute right-1 top-2 cursor-pointer duration-150"
        onClick={() => instance.deleteElements({ nodes: [{ id }] })}
      >
        <TrashIcon className="size-4"/>
      </span>
      <div className="resize dark-scrollbar nowheel custom-scrollbar min-h-8 min-w-20 max-w-96 max-h-48 nodrag z-10 bg-yellow-200 cursor-text flex-grow overflow-y-auto text-gray-800 px-2 pr-4 py-2">
        <Editor editorState={editorState} onChange={setEditorState} />
        {/* Resize node */}
        <span title="Resize" className="inline-block h-2 w-2 absolute right-0 bottom-0 rotate-[270deg]">
          <img src="https://img.icons8.com/?size=100&id=8185&format=png&color=#666666"/>
        </span>
      </div>
    </div>
  );
};
