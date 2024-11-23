import { Handle, Position } from "reactflow"

export const LeftHandler=({title, id, style})=>{
    return (
        <Handle
        type="target"
        style={{
          height: "15px",
          width: "15px",
          background: "white",
          border: "1px solid rgba(236, 124, 0, 1)",
          right: "-8px",
          borderRadius: "10000px",
          display: "flex",
          flexDirection: "row-reverse",
          left: "-8px",
          ...style
        }}
        position={Position.Left}
        id={`${id}`}
      >
        <span className="relative -left-5 top-2 text-xs text-node-primary">{title}</span>
      </Handle>
    )
}