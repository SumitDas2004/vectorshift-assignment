import { RightHandler } from "../customHandlers/rightHandler";
import { LeftHandler } from "../customHandlers/leftHandler";
import { useReactFlow } from "reactflow";
import { TrashIcon } from "@heroicons/react/24/outline";

export const NodeGenerator = ({ id, data }) => {
  const instance = useReactFlow();
  return (
    <div className=" outline hover:outline-4 transition-all duration-100 outline-node-secondary border-2 border-node-primary bg-node-bg shadow-md h-36 w-64 text-xs rounded-lg flex flex-col justify-between px-4 py-1">
      {/* ==================== Delete Node =================== */}
      <span
        title="Delete Node"
        className="text-gray-300 hover:text-red-500 absolute right-2 top-2 cursor-pointer duration-150"
        onClick={() => instance.deleteElements({ nodes: [{ id }] })}
      >
        <TrashIcon className="size-4"/>
      </span>

      {/* =================== LEFT HANDLER ================== */}
      <LeftHandler title={"input"} id={id + "-input"} />

      {/* =================== Title ==================== */}
      <div>
        <span className="text-base text-node-primary mr-1">
          <i className="fa-regular fa-file-lines"></i>
        </span>
        <span className="text-lg text-node-primary font-semibold">
          Enter the title
        </span>
      </div>

      {/* =================== Description ==================== */}
      <div>
        <span>Here is a description</span>
      </div>

      {/**
       * ======================= TEXT FIELD =================
       *
       * Uncomment the following to render a `text field`.
       * Also copy-paste the following state declaration and imports above:
       * const [input, setInput] = useState(data?.defaultValue || 'Text Field');
       * import { useState } from "react";
       */}

      {/* <label className="flex flex-col">
        <span className="text-slate-300">Input:</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="nodrag outline-none bg-transparent px-1 py-1 text-xs text-white duration-150 inputShadow"
        />
      </label> */}

      {/**
       * ======================= DROP-DOWN =================
       *
       * Uncomment the following to render a `drop-down list`
       * Also copy-paste the following state declaration and import statements above:
       * const [selectedValue, setSelectedValue] = useState(data.defaultSelection || 'Text');
       * import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
       * import { ChevronDownIcon } from "@heroicons/react/20/solid";
       */}
      {/**
         * <span className="flex flex-col">
        <span className="text-slate-300">Dropdown:</span>
        <Menu as="div" className="relative inline-block text-left nodrag">
          <div>
            <MenuButton className="flex items-center justify-between w-full gap-x-1.5 rounded-md py-1 px-3 font-semibold shadow-sm text-slate-100 text-xs">
              {selectedValue}
              <ChevronDownIcon
                aria-hidden="true"
                className="-mr-1 size-5 text-gray-400"
              />
            </MenuButton>
          </div>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="py-1">
              <MenuItem>
                <span
                  onClick={() => setSelectedValue("Text")}
                  className="text-xs block px-4 py-2 text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                >
                  Text
                </span>
              </MenuItem>
              <MenuItem>
                <span
                  onClick={() => setSelectedValue("File")}
                  className="block px-4 py-2 text-xs text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                >
                  File
                </span>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      </span> 
         */}

      {/* =================== RIGHT HANDLER ================== */}
      <RightHandler title={"output"} id={id + "-output"} />
    </div>
  );
};
