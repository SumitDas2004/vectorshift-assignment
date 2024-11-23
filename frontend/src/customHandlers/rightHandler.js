import { Handle, Position } from "reactflow"

export const RightHandler=({title, id, style})=>{
    return (
        <Handle
        type="source"
        style={{
          height: "15px",
          width: "15px",
          background: "white",
          border: "1px solid rgba(236, 124, 0, 1)",
          right: "-8px",
          borderRadius: "10000px",
          ...style
        }}
        position={Position.Right}
        id={`${id}`}
      >
        <span className="relative top-2 left-4 text-xs text-node-primary">{title}</span>
      </Handle>
    )
}