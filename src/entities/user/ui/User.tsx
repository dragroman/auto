import { DefaultSession } from "next-auth"

export const User = ({ user }: { user: DefaultSession["user"] }) => {
  console.log(user)
  return (
    <div>
      <div>
        Ваш почтовый ящик: <span className="font-bold">{user?.email}</span>
      </div>
    </div>
  )
}
