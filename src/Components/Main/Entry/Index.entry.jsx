import { Outlet } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import Form from "./Form";

function Entry() {
    const location = useLocation;

    return (
        <main id="entry">
            {location().pathname !== "/entry" ? (
                <Outlet />
            ) : (
                <>
                    <Form formType={"signin"} />
                    <p>
                        Pas de compte ? Créez-en un{" "}
                        <Link to={"/entry/signup"}>ici</Link>
                    </p>
                </>
            )}
        </main>
    );
}

export default Entry;
