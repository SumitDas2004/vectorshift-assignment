// draggableNode.js

export const DraggableNode = ({ type, label, icon }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        className='cursor-pointer outline outline-2 hover:outline-4 duration-75 outline-node-primary flex flex-col h-14 w-14 bg-[#fff7ef] text-node-primary text-xs type rounded-md font-semibold justify-center items-center'
        draggable
      >
          <span className="text-base"><i className={icon}/></span>
          <span>{label}</span>
      </div>
    );
  };
  