'use server'


import { signInFormSchema } from "../validators"
import { isRedirectError } from "next/dist/client/components/redirect-error"
import { signIn, signOut } from "@/auth"





//Sign in the user
export const signInWithCredentials = async (prevState: unknown, formData: FormData) => {
    try {
        const user = signInFormSchema.parse({
            email: formData.get('email'),
            password: formData.get('password')
        })

        await signIn('credentials', user)

        return {success: true, message: 'Signed in successfully'}
    } catch (error) {
        if (isRedirectError(error)) {
            throw error
        }

        return {success: false, message: 'Invalid email or password'}
    }
}

//Sign user out
export const signOutUser = async () => {
    await signOut()
}