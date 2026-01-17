'use client'
import AuthForm from '@/components/AuthForm'
import { signInSchema } from '@/lib/validations'
import React from 'react'
import { email } from 'zod'

const SignIn = () =>  (
    <AuthForm type="SIGN_IN" schema={signInSchema} defaultValues={{email:"", password:""}} />
  )

export default SignIn