import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"

export function SignupForm({
  className,
  user,
  email,
  pwd,
  onChangeUser,
  onChangeEmail,
  onChangePwd,
  onSubmit,
  isLoading,
  errMsg,
  ...props
}) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-white/10 bg-[#13141A] text-white shadow-[0_0_40px_rgba(0,0,0,0.5)] backdrop-blur-md p-6 rounded-3xl">
        <CardHeader className="space-y-3 pb-6">
          <CardTitle className="text-4xl font-bold tracking-tight text-white text-center">
            Create an account
          </CardTitle>
          <CardDescription className="text-gray-400 text-center text-base">
            Enter your details below to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            {errMsg && (
              <div className="p-3 text-sm rounded-lg bg-red-500/15 border border-red-500/30 text-red-400 font-medium animate-in fade-in slide-in-from-top-1 duration-200">
                {errMsg}
              </div>
            )}
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username" className="text-gray-300 text-lg">Username</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="johndoe"
                  value={user}
                  onChange={onChangeUser}
                  required
                  autoFocus
                  disabled={isLoading}
                  className="bg-[#0B0C11] border-white/10 text-white placeholder-gray-500 focus-visible:ring-indigo-500 py-6 text-lg rounded-xl"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email" className="text-gray-300 text-lg">Email Address</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={onChangeEmail}
                  required
                  disabled={isLoading}
                  className="bg-[#0B0C11] border-white/10 text-white placeholder-gray-500 focus-visible:ring-indigo-500 py-6 text-lg rounded-xl"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password" className="text-gray-300 text-lg">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={pwd}
                  onChange={onChangePwd}
                  required
                  disabled={isLoading}
                  className="bg-[#0B0C11] border-white/10 text-white placeholder-gray-500 focus-visible:ring-indigo-500 py-6 text-lg rounded-xl"
                />
              </Field>
              <Field className="pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium py-7 text-xl rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50"
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
                
                <FieldDescription className="text-center text-gray-400 text-base mt-5">
                  Already have an account?{" "}
                  <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium hover:underline">
                    Sign in
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
