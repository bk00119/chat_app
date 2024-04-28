import SignupField from "@/app/components/signupField"
import Link from "next/link"

export default async function SignupPage() {
  return (
    <div className="fixed left-0 top-0 w-screen h-screen bg-primary-yellow flex flex-col items-center justify-center">
      <div className="w-fit items-center flex flex-col">
        <p className="text-4xl font-merienda font-semibold mb-12">MangoTalk</p>
        {/* SIGNUP FORM */}
        <SignupField />

        <div className="flex items-center w-full my-8">
          <hr className="w-full border-black" />
          <p className="px-4">OR</p>
          <hr className="w-full border-black" />
        </div>

        {/* SINGIN OPTION */}
        <p>
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="text-primary-red font-bold focus:outline-none hover:text-secondary-red"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
