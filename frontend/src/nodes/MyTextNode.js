// // textNode.js

import {
  CompositeDecorator,
  convertToRaw,
  Editor,
  EditorState,
} from "draft-js";
import { useState } from "react";
import { Handle, Position } from "reactflow";

// import { useCallback, useState } from "react";
// import { Handle, Position } from "reactflow";
// import { createEditor, Editor, Transforms } from "slate";
// import { Editable, Slate, withReact } from "slate-react";

// export const TextNode = ({ id, data }) => {
//   const [editor] = useState(() => withReact(createEditor()));

//   const initialValue = [{ type: "normal", children: [{ text: "" }] }];

//   const renderElement = useCallback((props) => {
//     switch (props.element.type) {
//       case "variable":
//         return <Variable {...props} />;
//         break;
//       default:
//         return <span {...props.attributes}>{props.children}</span>;
//     }
//   }, []);

//   return (
//     <div style={{ width: 200, height: 80, border: "1px solid black" }}>
//       <div>
//         <span>Text</span>
//       </div>
//       <div>
//         <Slate
//           editor={editor}
//           initialValue={initialValue}
//           onValueChange={() => {
//             for (let [node, path] of Editor.nodes(editor, {
//               match: Text.isText,
//             })) {
//               const { text } = node;
//               const regex = /{{([a-zA-Z_$][a-zA-Z0-9_$]*)}}/g;
//               for (
//                 let match = regex.exec(text);
//                 match !== null;
//                 match = regex.exec(text)
//               ) {
//                 const start = match.index;
//                 const end = match.index + match[0].length;
//                 const range = {
//                   anchor: {
//                     offset: start,
//                     path: path,
//                   },
//                   focus: {
//                     offset: end,
//                     path: path,
//                   },
//                 };

//                 Transforms.select(editor, range);
//                 Transforms.delete(editor);
//                 Transforms.insertNodes(editor, [
//                   {
//                     type: "variable",
//                     children: [{ text: match[1] }],
//                   },
//                   {
//                     type: "normal",
//                     children: [{ text: "" }],
//                   }
//                 ]);
//               }
//             }
//           }}
//         >
//           <Editable renderElement={renderElement} className="nodrag" />
//         </Slate>
//       </div>
//       <Handle type="source" position={Position.Right} id={`${id}-output`} />
//     </div>
//   );
// };

// const Variable = (props) => {
//   return (
//     <span
//       {...props.attributes}
//       style={{
//         border: "1px solid",
//         padding: "2px",
//       }}
//       // className="font-semibold border-2 px-2 py-[0.1rem]"
//     >
//       <span>
//         <span>{"{}"}</span>
//         <span>&nbsp;</span>
//         {props.children}
//       </span>
//     </span>
//   );
// };

export const TextNode = ({ id, data }) => {
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
  
  const [variables, setVariables] = useState([]);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(decorator)
  );



  const handleChange = (newState) => {
    setEditorState(newState);
    extractVariables();
  };

  const extractVariables = () => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    let variables = [];

    rawContent.blocks.forEach((block) => {
      const text = block.text;
      const regex = /{{([a-zA-Z_$][a-zA-Z0-9_$]*)}}/g;
      let matchArr;
      while ((matchArr = regex.exec(text)) !== null) {
        variables.push(matchArr[1]);
      }
    });
    const set = new Set([...variables]);
    variables = Array.from(set);
    setVariables(variables);
  };

  return (
    <div style={{ width: 200, height: 80, border: "1px solid black" }}>
      {variables.map((variable, index) => (
        <Handle
          key={index}
          type="target"
          position={Position.Left}
          id={variable}
          style={{ top: `${100 / (index + 1)}%` }}
          about="hello"
        />
      ))}
      <div>
        <span>Enter the title</span>
      </div>

      <div>
        <span>Here is a description</span>
      </div>

      <div className="nodrag">
        <Editor editorState={editorState} onChange={handleChange} />
      </div>

      {/* =================== RIGHT HANDLER ================== */}
      <Handle type="source" position={Position.Right} id={`${id}-response`} />
    </div>
  );
};

const Variable = (props) => {
  return (
    <span className="font-semibold border-2 px-2 py-[0.1rem]">
      <span>
        <span>{"{}"}</span>
        <span>&nbsp;</span>
        {props.children}
      </span>
    </span>
  );
};
