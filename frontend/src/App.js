import { ToastContainer } from 'react-toastify';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <PipelineToolbar />
      <PipelineUI />
      <ToastContainer position={'bottom-left'} theme='colored'/>
    </div>
  );
}

export default App;
