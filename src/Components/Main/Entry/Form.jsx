import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validate } from "../../../Helpers/sanitize";
import { signup, signin } from "../../../services/API/user";

function Form({ formType }) {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({ alias: "", password: "" });
	const alias = useRef();

    const [msg, setMsg] = useState(null);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (formType === "signin") {
            handleSignin();
        }
        if (formType === "signup") {
            handleSignup();
        }
        setInputs({ alias: "", password: "" });
    };

    const handleSignin = async() => {
		console.log(inputs)
		const inputsSanitized = validate("signin", inputs);
		const res = await signin(inputsSanitized);
		console.log(res)
		if(res.status === 404){
			setMsg(res.data.msg);
			return;
		}
		localStorage.setItem("u_a_u_t_h", res.data.token)
		navigate("/entry/dashboard");
	};

    const handleSignup = async () => {
        const inputsValidation = validate("signup", inputs);
		if(inputsValidation === true){
			const res = await signup(inputs);
			if (res.status === 409) {
				setMsg(res.data.msg);
				return;
			} else {
				navigate("/entry");
			}
		} else {
			setMsg(inputsValidation);
		}
    };

    useEffect(() => {
		alias.current.focus()
    }, []);

    return (
        <form onSubmit={onSubmitHandler}>
            
            <fieldset>
                <legend>{formType === "signin" ? "Sign in" : "Sign up"}</legend>
                <input
					ref={alias}
                    type="text"
                    placeholder="alias"
                    value={inputs.alias}
                    onChange={(e) =>
                        setInputs({ ...inputs, alias: e.target.value })
                    }
                />
                <input
                    type="password"
                    placeholder="password"
                    value={inputs.password}
                    onChange={(e) =>
                        setInputs({
                            ...inputs,
                            password: e.target.value,
                        })
                    }
                />
                {msg && <p>{msg}</p>}

                <input type="submit" value="send" />
            </fieldset>
        </form>
    );
}

export default Form;
