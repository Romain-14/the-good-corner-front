import { Routes, Route } from "react-router-dom";
import Home from "../Components/Main/Home";
import Shop from "../Components/Main/Shop";
import Detail from "../Components/Main/Detail";
import Entry from "../Components/Main/Entry/Index.entry";
import Signup from "../Components/Main/Entry/Signup";
import Dashboard from "../Components/Main/Entry/Dashboard";
import Signout from "../Components/Main/Entry/Signout";
import HOC from "../Helpers/HOC";

import NotFound from "../Components/Main/NotFound";

function Router() {
    return (
        <Routes>
            <Route index path="/" element={<HOC child={Home} />} />
            <Route path="shop" element={<HOC child={Shop} />}>
                <Route path=":id" element={<HOC child={Detail} />} />
            </Route>
			<Route path="entry" element={<Entry />}>
                <Route path="signup" element={<Signup />} />
                <Route path="dashboard" element={<HOC child={Dashboard} isAuthRequired={true}/>} />
                <Route path="signout" element={<HOC child={Signout} isAuthRequired={true}/>} />
            </Route>
            <Route path="*" element={<NotFound />}/>
        </Routes>
    );
}

export default Router;
