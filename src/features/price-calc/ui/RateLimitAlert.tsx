// components/RateLimitAlert.tsx
"use client"

import React from "react"
import { Alert, AlertDescription, AlertTitle } from "@shared/ui/alert"
import { Button } from "@shared/ui/button"
import { Clock, UserPlus, Mail, AlertTriangle, LogIn } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"

interface RateLimitAlertProps {
  userType: "anonymous" | "registered" | "premium"
}

export const RateLimitAlert: React.FC<RateLimitAlertProps> = ({ userType }) => {
  const t = useTranslations("form.rateLimit")

  const getAlertContent = () => {
    switch (userType) {
      case "anonymous":
        return {
          icon: <UserPlus className="h-5 w-5" />,
          title: t("anonymous.title"),
          description: t("anonymous.description"),
          actions: (
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <Button size="sm" asChild className="flex items-center gap-2">
                <Link href="/signup">
                  <UserPlus className="h-4 w-4" />
                  {t("anonymous.registerButton")}
                </Link>
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-2"
                asChild
              >
                <Link href="/signin">
                  <LogIn className="h-4 w-4" />
                  {t("anonymous.loginButton")}
                </Link>
              </Button>
            </div>
          ),
        }

      case "registered":
        return {
          icon: <Clock className="h-5 w-5" />,
          title: t("registered.title"),
          description: t("registered.description"),
          actions: (
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-2"
                asChild
              >
                <Link href="/contact">
                  <Mail className="h-4 w-4" />
                  {t("registered.contactButton")}
                </Link>
              </Button>
            </div>
          ),
        }

      case "premium":
        return {
          icon: <AlertTriangle className="h-5 w-5" />,
          title: t("premium.title"),
          description: t("premium.description"),
          actions: (
            <div className="flex justify-center mt-4">
              <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-2"
                asChild
              >
                <Link href="/contact">
                  <Mail className="h-4 w-4" />
                  {t("premium.contactButton")}
                </Link>
              </Button>
            </div>
          ),
        }

      default:
        return null
    }
  }

  const content = getAlertContent()

  if (!content) return null

  return (
    <Alert variant="warning" className="w-full">
      {content.icon}
      <AlertTitle>{content.title}</AlertTitle>
      <AlertDescription>
        {content.description}
        {content.actions}
      </AlertDescription>
    </Alert>
  )
}
