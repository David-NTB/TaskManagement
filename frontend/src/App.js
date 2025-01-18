import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskManagement from "./components/TaskManagement";
import Test from "./components/Test";
import EditCard from "./components/App/EditCard";

import UserList from "./components/User/UserList";
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

          <Route path="/" element={<TaskManagement />} />
          <Route path="/test" element={<Test />} />
          <Route path="/cards/edit/:cardId" element={<EditCard />} />

          <Route path="/users" element={<UserList />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/labels" element={<LabelList />} />
          <Route path="/labels/add" element={<AddLabel />} />
          <Route path="/labels/edit/:id" element={<EditLabel />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
