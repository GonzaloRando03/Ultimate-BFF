import * as yup from 'yup'

const VALIDATIONS = {
    email: yup
        .string()
        .email('El e-mail introducido no es correcto')
        .required('El e-mail es obligatorio'),
    password: yup
        .string()
        .min(6, 'La contraseña debe tener al menos 6 carácteres')
        .max(1000, 'La contraseña es demasiado corta')
        .required('La contraseña es obligatoria'),
    nombre: yup
        .string()
        .required('El nombre es obligatorio'),
    apellidos: yup
        .string()
        .required('El apellido es obligatorio'),
}


export const loginValidationSchema = yup.object().shape({
    email: VALIDATIONS.email,
    password:VALIDATIONS.password
})


export const registroValidationSchema = yup.object().shape({
    email: VALIDATIONS.email,
    password:VALIDATIONS.password,
    nombre: VALIDATIONS.nombre,
    apellidos: VALIDATIONS.apellidos
})


export type FormValidationError = ValidationYupError | any

export interface ValidationYupError{
    message:string
}