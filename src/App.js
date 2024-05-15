import {Routes, Route} from "react-router-dom";

import Layout from "./components/Layout/Layout";
import TodoPage from "./pages/TodoPage/TodoPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>
            <Route index element={<TodoPage />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
