import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
                        <Switch>
                            {/* <Route path="/" exact>
                                <HomePage />
                            </Route> */}
                            <Route path="/news">
                                <News />
                            </Route>
                            <Route path="/tasks">
                                <Tasks />
                            </Route>
                            <Route path="/createTask">
                                <CreateTask />
                            </Route>
                            <Route path="/editTask/:id">
                                <EditTask />
                            </Route>
                            <Route path="/account">
                                <Profile />
                            </Route>
                            <Route path="/edit-profile">
                                <EditProfile />
                            </Route>
                        </Switch>
                    </div>
                </SelectorContext>
            </section>
        </Router>
    );
}

export default Layout;