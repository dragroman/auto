"use client"

import { SignOut } from "@features/auth/sign-out"
import { Button } from "@shared/ui/button"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

export const User = () => {
  const session = useSession()
  return (
    <h1>
      User
      <div>{session.status}</div>
      <div>EMail: {session.data?.user?.email}</div>
      <div>id: {session.data?.user?.id}</div>
      <div>Name: {session.data?.user.name}</div>
      {session.status === "authenticated" ? (
        <SignOut />
      ) : (
        <Button asChild>
          <Link href="/signin">Login</Link>
        </Button>
      )}
    </h1>
  )
}
