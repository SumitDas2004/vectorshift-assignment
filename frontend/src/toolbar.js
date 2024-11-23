// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div className='bg-transparent fixed left-5 h-full flex justify-center z-30 '>
            <div className='flex flex-col justify-center items-center gap-2' style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='customInput' label='Input' icon="fa-solid fa-arrow-right-to-bracket" />
                <DraggableNode type='customOutput' label='Output' icon={"fa-solid fa-arrow-right-from-bracket"}/>
                <DraggableNode type='llm' label='LLM' icon={"fa-solid fa-square-binary"} />
                <DraggableNode type='text' label='Text' icon={"fa-regular fa-file-lines"} />
                <DraggableNode type='note' label='Note' icon={"fa-regular fa-note-sticky"} />
            </div>
        </div>
    );
};
