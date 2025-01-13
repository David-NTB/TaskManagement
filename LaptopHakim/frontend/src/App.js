import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./components/User/UserList";
import MainMenu from "./components/MainMenu";
import Test from "./components/Test";

import AddUser from "./components/User/AddUser";
import EditUser from "./components/User/EditUser";
import LabelList from "./components/Label/LabelList";
import AddLabel from "./components/Label/AddLabel";
import EditLabel from "./components/Label/EditLabel";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="app" element={<Test />} />
          <Route path="" element={<MainMenu />} />
          <Route path="users" element={<UserList />} />
          <Route path="users/add" element={<AddUser />} />
          <Route path="users/edit/:id" element={<EditUser />} />
          <Route path="labels" element={<LabelList />} />
          <Route path="labels/add" element={<AddLabel />} />
          <Route path="labels/edit/:id" element={<EditLabel />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
