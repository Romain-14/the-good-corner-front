export const validate = (type, inputs) => {
    if (type === "signin") {
        const inputsSanitized = {
            alias : inputs.alias.trim(),
            password : inputs.password.trim(),
        }
        return inputsSanitized;
    }
    if (type === "signup") {
        if (
            inputs.alias.trim().length < 3 ||
            inputs.password.trim().length < 3
        ) {
            return "3 caractères minimum";
        } else return true;
    }
};
