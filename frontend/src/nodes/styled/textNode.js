import { RightHandler } from "../../customHandlers/rightHandler";
import { LeftHandler } from "../../customHandlers/leftHandler";
import {
  CompositeDecorator,
  Editor,
  EditorState,
  convertToRaw,
} from "draft-js";
import { useEffect, useRef, useState } from "react";
import { useReactFlow, useUpdateNodeInternals } from "reactflow";
import { TrashIcon } from "@heroicons/react/24/outline";

export const TextNode = ({ id, data }) => {
  const ref = useRef();

  // Instance of the react flow component
  const reactFlowInstance = useReactFlow();

  // To be called when the position of the handlers change.
  const updateNodeInternals = useUpdateNodeInternals();

  const variableStrategy = (contentBlock, callback, contentState) => {
    const text = contentBlock.getText();
    const regex = /{{([a-zA-Z_$][a-zA-Z0-9_$]*)}}/g;
    let matchArr;
    while ((matchArr = regex.exec(text)) !== null) {
      const start = matchArr.index;
      const end = start + matchArr[0].length;
      callback(start, end);
    }
  };

  const decorator = new CompositeDecorator([
    {
      strategy: variableStrategy,
      component: Variable,
    },
  ]);

  //   State to store the created variables.
  const [variables, setVariables] = useState([]);

  //   Creating an empty editor state
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(decorator)
  );

  // Method to extract the variables from the editor's state
  const extractVariables = () => {
    const contentState = editorState.getCurrentContent();
    // Getting the raw state of the editor
    const rawContent = convertToRaw(contentState);
    let variables = [];

    // Extacting all the variables from the editor.
    rawContent.blocks.forEach((block) => {
      const text = block.text;
      const regex = /{{([a-zA-Z_$][a-zA-Z0-9_$]*)}}/g;
      let matchArr;
      while ((matchArr = regex.exec(text)) !== null) {
        variables.push(matchArr[1]);
      }
    });
    // Ensuring the unicity of variables
    const set = new Set([...variables]);
    variables = Array.from(set);
    setVariables(variables);
  };

  useEffect(() => {
    // Extracting all the variables whenever the editorState changes
    extractVariables();
  }, [editorState]);

  useEffect(() => {
    // Updating the node interals about handler positions whenever the 'variables' state changes.
    updateNodeInternals(id);
  }, [variables]);

  return (
    <div
      ref={ref}
      className=" outline hover:outline-4 transition-all duration-100 outline-node-secondary border-2 border-node-primary bg-node-bg shadow-md min-h-24 w-64 text-xs rounded-lg flex flex-col mt-2 px-4 py-1 pb-3"
    >
      {/* ==================== Delete Node =================== */}
      <span
        title="Delete Node"
        className="text-gray-300 hover:text-red-500 absolute right-2 top-3 cursor-pointer duration-150"
        onClick={() => reactFlowInstance.deleteElements({ nodes: [{ id }] })}
      >
        <TrashIcon className="size-4"/>
      </span>

      {/* =================== LEFT HANDLERS ================== */}
      {variables.map((variable, ind) => (
        <LeftHandler
          key={ind}
          title={variable}
          id={`${id}-input-${ind}`}
          style={{
            top: `${
              25 + ((ref.current.clientHeight - 5) * ind) / variables.length
            }px`,
          }}
        />
      ))}

      {/* =================== Title ==================== */}
      <div>
        <span className="text-base text-node-primary mr-1">
          <i className="fa-regular fa-file-lines"></i>
        </span>
        <span className="text-lg text-node-primary font-semibold">Text</span>
      </div>

      {/* ================== Editor =================== */}
      <span className="text-slate-200 p-1">Text</span>
      <div className="z-30 cursor-text nowheel nodrag min-h-8 max-h-32 overflow-y-auto text-white outline hover:outline-2 duration-100 outline-1 outline-node-primary px-2 py-2 rounded-md">
        <Editor editorState={editorState} onChange={setEditorState} />
      </div>

      {/* =================== RIGHT HANDLER ================== */}
      <RightHandler title={"output"} id={id + "-output"} />
    </div>
  );
};

const Variable = (props) => {
  return (
    <span className="custom-scrollbar inline-block my-[0.02rem] font-semibold text-xs mx-1 border-[0.5px] border-white rounded-sm bg-[#ec7c004d] rgba(236, 124, 0, 0.4)] text-node-primary px-[0.2rem] py-[0.02rem]">
      <span>{props.children}</span>
    </span>
  );
};
