import { RightHandler } from "../../customHandlers/rightHandler";
import { LeftHandler } from "../../customHandlers/leftHandler";
import { useReactFlow } from "reactflow";
import { TrashIcon } from "@heroicons/react/24/outline";

export const LLMNode = ({ id, data }) => {
  const instance = useReactFlow();
  return (
    <div className=" outline hover:outline-4 transition-all duration-100 outline-node-secondary border-2 border-node-primary bg-node-bg shadow-md h-24 w-56 text-xs rounded-lg px-4 py-1">
      {/* ==================== Delete Node =================== */}
      <span
        title="Delete Node"
        className="text-gray-300 hover:text-red-500 absolute right-2 top-2 cursor-pointer duration-150"
        onClick={() => instance.deleteElements({ nodes: [{ id }] })}
      >
        <TrashIcon className="size-4"/>
      </span>

      {/* =================== LEFT HANDLER ================== */}
      <LeftHandler
        title={"input1"}
        id={id + "-input1"}
        style={{ top: `2rem` }}
      />
      <LeftHandler
        title={"input2"}
        id={id + "-input2"}
        style={{ top: `4rem` }}
      />

      {/* =================== Title ==================== */}
      <div>
        <span className="text-base text-node-primary mr-1">
          <i className="fa-solid fa-square-binary"></i>
        </span>
        <span className="text-lg text-node-primary font-semibold">
          Enter the title
        </span>
      </div>

      {/* =================== Description ==================== */}
      <div>
        <span className="text-slate-200 mt-2 text-sm">This is an LLM.</span>
      </div>

      {/* =================== RIGHT HANDLER ================== */}
      <RightHandler title={"output"} id={id + "-output"} />
    </div>
  );
};
