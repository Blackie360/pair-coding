import { validateRequest } from '@/app/lib/auth'
import Login from '@/components/Login'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { redirect } from 'next/navigation'

const Signup = async () => {
  const {user} = await validateRequest()

  if(user){
  return   redirect("/")
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="max-w-md w-full p-4 bg-white shadow-md rounded-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">Sign in to your account </CardTitle>
        </CardHeader>
        <CardContent>
          <Login />
        </CardContent>
      </Card>
    </div>
  )
}

export default Signup