import { TextField } from "@mui/material"
import { useField } from "formik"

const  TextFieldWrapper =({name,...props}) => {
    const [field,meta] = useField(name)

    const configTextField = {
        ...props,
        ...field,
        name,
    }

    if(meta && meta.error && meta.touched) {
        configTextField.error = true,
        configTextField.helperText = meta.error
    }

    return (
        <>
            <TextField {...configTextField} />
        </>
    )
}

export default TextFieldWrapper