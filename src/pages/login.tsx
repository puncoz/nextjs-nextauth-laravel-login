import { AppConfig } from "@/config/app.config"
import { LoginFormData } from "@/formdata/LoginFormData"
import useAuth from "@/hooks/useAuth"
import { options as authOptions } from "@/pages/api/auth/[...nextauth]"
import { siteUrl } from "@/utils/helpers"
import { ExclamationCircleIcon, XIcon } from "@heroicons/react/solid"
import { classValidatorResolver } from "@hookform/resolvers/class-validator"
import { GetServerSideProps, NextPage } from "next"
import { unstable_getServerSession } from "next-auth"
import { useCallback, useState } from "react"
import { Controller, useForm } from "react-hook-form"

type Props = {}

const Login: NextPage<Props> = () => {
    const [errorMessage, setErrorMessage] = useState<string>("")

    const { login, loading } = useAuth()

    const { control, formState: { errors }, handleSubmit } = useForm<LoginFormData>({
        resolver: classValidatorResolver(LoginFormData),
    })

    const handleLogin = useCallback(async (data: LoginFormData) => {
        await login(data, (error: string) => {
            setErrorMessage(error)
        })
    }, [login])

    return (
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {errorMessage && (
                        <div className="rounded-md bg-red-50 p-4 mb-5">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <ExclamationCircleIcon className="h-5 w-5 text-red-400"/>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-red-800">{errorMessage}</p>
                                </div>

                                <div className="ml-auto pl-3">
                                    <div className="-mx-1.5 -my-1.5">
                                        <button type="button"
                                                className="inline-flex bg-red-50 rounded-md p-1.5 text-red-500
                                                        hover:bg-red-100 focus:outline-none focus:ring-2
                                                        focus:ring-offset-2 focus:ring-offset-red-50
                                                        focus:ring-red-600"
                                                onClick={e => setErrorMessage("")}>
                                            <span className="sr-only">Dismiss</span>
                                            <XIcon className="h-5 w-5"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(handleLogin)} className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <Controller name="email"
                                            control={control}
                                            render={({ field }) => (
                                                <input
                                                    type="email"
                                                    value={field.value}
                                                    autoComplete="email"
                                                    onChange={e => field.onChange(e.target.value)}
                                                    className="appearance-none block w-full px-3 py-2 border border-gray-300
                                                    rounded-md shadow-sm placeholder-gray-400 text-gray-700 focus:outline-none
                                                    focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                                            )}/>

                                <span>{errors.email?.message}</span>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <Controller name="password"
                                            control={control}
                                            render={({ field }) => (
                                                <input
                                                    type="password"
                                                    value={field.value}
                                                    autoComplete="password"
                                                    onChange={e => field.onChange(e.target.value)}
                                                    className="appearance-none block w-full px-3 py-2 border border-gray-300
                                                    rounded-md shadow-sm placeholder-gray-400 text-gray-700 focus:outline-none
                                                    focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                                            )}/>
                                <span>{errors.password?.message}</span>
                            </div>
                        </div>

                        <div>
                            <button type="submit"
                                    disabled={loading}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent
                                                rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600
                                                hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                                                focus:ring-indigo-500">
                                {loading ? "Loading..." : "Sign in"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (session) {
        return {
            redirect: {
                destination: siteUrl(AppConfig.authenticatedRoute),
                permanent: true,
            },
        }
    }

    return {
        props: {},
    }
}

export default Login
