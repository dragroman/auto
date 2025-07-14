"use client"

import { useState } from "react"
import { Button } from "@shared/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@shared/ui/drawer"
import { RequestCalcForm } from "./RequestForm"
import { WebformCallbackForm } from "@features/webform-callback"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { isOwner } from "@shared/lib/utils"
import { TNodeCalculationTeaser } from "@entities/node-calculation"
import { Phone, LogIn, UserPlus } from "lucide-react"
import { useMediaQuery } from "@shared/lib/hooks"

// Types
type UserRole = "anonymous" | "authenticated" | "owner"

interface RequestCalcProps {
  node: TNodeCalculationTeaser
  currentUserID?: string
  className?: string
}

interface ModalContentData {
  title: React.ReactNode
  description: string
  content: React.ReactNode
}

// Helper function to determine user role
const getUserRole = (
  currentUserID: string | undefined,
  nodeOwnerId: string
): UserRole => {
  if (!currentUserID) return "anonymous"
  if (isOwner(nodeOwnerId, currentUserID)) return "owner"
  return "authenticated"
}

// Separate components for different content types
const AuthButtons = () => (
  <>
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-gray-200" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-gray-500">или</span>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-3">
      <Button asChild variant="outline" className="flex items-center gap-2">
        <Link href="/signin">
          <LogIn className="h-4 w-4" />
          Войти
        </Link>
      </Button>
      <Button asChild className="flex items-center gap-2">
        <Link href="/signup">
          <UserPlus className="h-4 w-4" />
          Регистрация
        </Link>
      </Button>
    </div>
  </>
)

const CallbackContent = () => (
  <div className="space-y-6">
    <WebformCallbackForm />
    <AuthButtons />
  </div>
)

// Modal wrapper component
const ModalWrapper = ({
  open,
  onOpenChange,
  trigger,
  content,
  isDesktop,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  trigger: React.ReactNode
  content: ModalContentData
  isDesktop: boolean
}) => {
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{content.title}</DialogTitle>
            <DialogDescription>{content.description}</DialogDescription>
          </DialogHeader>
          {content.content}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{content.title}</DrawerTitle>
          <DrawerDescription>{content.description}</DrawerDescription>
        </DrawerHeader>
        <div className="px-4">{content.content}</div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Закрыть</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

// Trigger button component
const TriggerButton = ({
  userRole,
  isRequested,
  isCompleted,
  className,
  t,
  onClick,
}: {
  userRole: UserRole
  isRequested: boolean
  isCompleted: boolean
  className?: string
  t: (key: string) => string
  onClick?: () => void
}) => {
  // For owner
  if (userRole === "owner") {
    if (isCompleted) {
      return <span className="text-green-600 font-medium">Completed</span>
    }

    if (isRequested) {
      return (
        <Button className={className} variant="outline" disabled>
          {t("form.requested")}
        </Button>
      )
    }

    return (
      <Button variant="secondary" className={className} onClick={onClick}>
        {t("form.request")}
      </Button>
    )
  }

  // For anonymous and authenticated non-owners
  return (
    <Button variant="outline" className={className} onClick={onClick}>
      {userRole === "anonymous" ? t("form.request") : "Запрос"}
    </Button>
  )
}

// Main component
export const RequestCalc = ({
  node,
  currentUserID,
  className,
}: RequestCalcProps) => {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const t = useTranslations()

  // Determine user role
  const userRole = getUserRole(currentUserID, node.uid.id)

  // Node properties
  const { field_status: status, id: nodeId } = node
  const isRequested = status === "requested"
  const isCompleted = status === "completed"

  // Don't show modal for completed owner calculations
  if (userRole === "owner" && isCompleted) {
    return (
      <TriggerButton
        userRole={userRole}
        isRequested={isRequested}
        isCompleted={isCompleted}
        className={className}
        t={t}
      />
    )
  }

  // Get modal content based on user role
  const getModalContent = (): ModalContentData => {
    switch (userRole) {
      case "anonymous":
        return {
          title: (
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-yellow-500" />
              Запрос
            </div>
          ),
          description:
            "Оставьте свои контакты, и мы свяжемся с вами для уточнения деталей расчета",
          content: <CallbackContent />,
        }

      case "authenticated":
        return {
          title: (
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-yellow-500" />
              Обратный звонок
            </div>
          ),
          description:
            "Оставьте свои контакты, и мы свяжемся с вами для консультации по данному расчету",
          content: (
            <div className="space-y-6">
              <WebformCallbackForm nodeId={node.id} />
            </div>
          ),
        }

      case "owner":
        return {
          title: "Уточнение данных расчета",
          description:
            "Заполните дополнительную информацию для более точного расчета",
          content: (
            <RequestCalcForm
              nodeId={nodeId}
              nodeType="node--calculation"
              onClose={() => setOpen(false)}
            />
          ),
        }
    }
  }

  const trigger = (
    <TriggerButton
      userRole={userRole}
      isRequested={isRequested}
      isCompleted={isCompleted}
      className={className}
      t={t}
      onClick={() => setOpen(true)}
    />
  )

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      trigger={trigger}
      content={getModalContent()}
      isDesktop={isDesktop}
    />
  )
}
