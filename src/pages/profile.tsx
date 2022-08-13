import { AppConfig } from "@/config/app.config"
import useAuth from "@/hooks/useAuth"
import { options as authOptions } from "@/pages/api/auth/[...nextauth]"
import { IUser } from "@/types/entities/IUser"
import { IProfileResponse } from "@/types/modules/IAuth"
import Api from "@/utils/Api"
import { siteUrl } from "@/utils/helpers"
import { BadgeCheckIcon, ExclamationCircleIcon, LogoutIcon } from "@heroicons/react/outline"
import type { GetServerSideProps, NextPage } from "next"
import { unstable_getServerSession } from "next-auth"
import { MouseEvent, useCallback } from "react"

type Props = {
    profile: IUser
}

const Profile: NextPage<Props> = ({ profile }) => {
    const { logout } = useAuth()

    const handleLogout = useCallback(async (event: MouseEvent<HTMLButtonElement>) => {
        await logout()
    }, [logout])

    return (
        <main className="container flex justify-center items-center h-screen">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Profile Information</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
                    </div>

                    <div>
                        <button className="px-2 py-2 inset-2 bg-gray-100 hover:shadow hover:text-red-500
                                            transition-all ease-in-out delay-150"
                                onClick={handleLogout}>
                            <LogoutIcon className="h-4 h-5"/>
                        </button>
                    </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Full name</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {profile.first_name} {profile.last_name}
                            </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Email address</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <p className="flex gap-2 items-center">
                                    {profile.email}
                                    {profile.email_verified_at ? (
                                        <BadgeCheckIcon className="h-4 w-4 text-green-500"/>
                                    ) : (
                                        <ExclamationCircleIcon className="h-4 w-4 text-red-500"/>
                                    )}
                                </p>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </main>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
        return {
            redirect: {
                destination: siteUrl(AppConfig.unAuthenticatedRoute),
                permanent: true,
            },
        }
    }

    const api = new Api(session.accessToken)

    const { body: { payload } } = await api.get<IProfileResponse>("/profile")

    return {
        props: {
            profile: payload?.user,
        },
    }
}

export default Profile
