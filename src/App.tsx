import styles from "./App.module.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "./components/Home/Home";
import { Header } from "./components/Header/Header";
import { useState } from "react";
import { InfoModal } from "./components/InfoModal/IndoModal";
import { Pomodone } from "./components/PomoDone/Pomodone";

function App() {
  const [toggleInfoModal, setToggleInfoModal] = useState<boolean>(false);
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Header toggleModal={() => setToggleInfoModal(true)} />
        <Pomodone />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="history" element={<Home />} />
        </Routes>
      </BrowserRouter>
      {toggleInfoModal && <InfoModal closeModal={() => setToggleInfoModal(false)} />}
    </div>
  );
}

export default App;
