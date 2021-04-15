import { useState } from 'react';
import Modal from './components/modal';
import './App.css';

function App() {
  const [modal1, changeModal1State] = useState(false);
  const openModal1 = () => changeModal1State(true);
  const onModal1Ok = () => changeModal1State(false);
  const onModal1Cancel = () => changeModal1State(false);

  return (
    <div className="App container-fluid">
      <section>
        <h1>Section 1</h1>

        <div className="section-content">
          <div className="row">
            <div className="col">
              <Modal
                title="Modal 1"
                open={modal1}
                manualControl
                onOk={onModal1Ok}
                onCancel={onModal1Cancel}
                onInitContentClick={openModal1}
              >
                This is modal 1 content.
              </Modal>
            </div>

            <div className="col">
              <Modal title="Modal 2">
                This is modal 2 content.
              </Modal>
            </div>

            <div className="col">
              <Modal title="Modal 3">
                This is modal 3 content.
              </Modal>
            </div>
          </div>
        </div>

      </section>

      <br />

      <section>
        <h1>Section 2</h1>

        <div className="section-content">
          <div className="row">
            <div className="col">
              <Modal title="Modal 4">
                This is modal 4 content.
              </Modal>
            </div>

            <div className="col">
              <Modal title="Modal 5">
                This is modal 5 content.
              </Modal>
            </div>

            <div className="col">
              <Modal title="Modal 6">
                This is modal 6 content.
              </Modal>
            </div>
          </div>
        </div>
    
      </section>
    </div>
  );
}

export default App;
