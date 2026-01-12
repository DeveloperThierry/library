import AuthForm from '@/components/AuthForm'
import { signUpSchema } from '@/lib/validations'

const SignUp = () =>  (
    <AuthForm type="SIGN_UP" schema={signUpSchema} defaultValues={{email:"", password:"", fullName:"", universityId:0, universityCard:""}}/>
  )

export default SignUp