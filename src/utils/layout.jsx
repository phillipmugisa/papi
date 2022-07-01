import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import { SelectorContext } from "./selectorContext.jsx";
import Header from "../components/header";
import SideBar from "../components/sideBar";
import News from "../pages/news";
import Tasks from "../pages/tasks";
import CreateTask from '../components/tasks/createTask.js';
import EditTask from '../components/tasks/editTask';
import Profile from "../components/user/profile";
import EditProfile from "../components/user/editProfile";

const Layout = () => {

    return (
        <Router>
            <Header />
            <section className="body-container">
                <SelectorContext>
                    <SideBar />
                    <div className="main">
                        <Routes>
                            {/* <Route path={`/`} exact element={<HomePage />} /> */}
                            <Route path="/news" exact element={<News />} />
                            <Route path="/tasks"  exact element={<Tasks />} />
                            <Route path="/createTask"  exact element={<CreateTask />} />
                            <Route path="/editTask/:id"  exact element={<EditTask />} />
                            <Route path="/account"  exact element={<Profile />} />
                            <Route path="/edit-profile"  exact element={<EditProfile />} />
                        </Routes>
                    </div>
                </SelectorContext>
            </section>
        </Router>
    );
}

export default Layout;