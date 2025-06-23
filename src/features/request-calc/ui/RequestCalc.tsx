"use client"

import { useState, useEffect } from "react"
import { Button, buttonVariants } from "@shared/ui/button"
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
import Link from "next/link"
import { useTranslations } from "next-intl"
import { isOwner } from "@shared/lib/utils"
import { TNodeCalculationTeaser } from "@entities/node-calculation"

export const RequestCalc = ({
  node,
  currentUserID,
  className,
}: {
  node: TNodeCalculationTeaser
  currentUserID?: string
  className?: string
}) => {
  const [open, setOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  const isAuthenticated = !!currentUserID
  const isRequested = node?.field_status === "requested"

  const owner = node?.uid.id
  const nodeId = node?.id
  const nodeType = "calculation"

  const t = useTranslations()

  useEffect(() => {
    setIsDesktop(window.matchMedia("(min-width: 768px)").matches)

    const mediaQuery = window.matchMedia("(min-width: 768px)")
    const handleResize = (e: MediaQueryListEvent) => setIsDesktop(e.matches)

    mediaQuery.addEventListener("change", handleResize)
    return () => mediaQuery.removeEventListener("change", handleResize)
  }, [])

  // Функция для закрытия модального окна
  const handleClose = () => {
    setOpen(false)
  }

  const triggerButton = !isAuthenticated ? (
    // Если не авторизован - показываем кнопку входа
    <>
      <Link href="/signin" className={buttonVariants({ variant: "outline" })}>
        {t("form.request")}
      </Link>
    </>
  ) : currentUserID && isOwner(owner, currentUserID) ? (
    // Существующая логика для владельца
    isRequested ? (
      <Button className={className} variant="outline" disabled>
        {t("form.requested")}
      </Button>
    ) : (
      <Button variant="secondary" className={className}>
        {t("form.request")}
      </Button>
    )
  ) : // Для авторизованного пользователя, который не владелец
  null

  if (!isAuthenticated) {
    return triggerButton
  }

  return isDesktop ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Уточнение данных расчета</DialogTitle>
          <DialogDescription>
            Заполните дополнительную информацию для более точного расчета
          </DialogDescription>
        </DialogHeader>
        <RequestCalcForm
          nodeId={nodeId}
          nodeType={nodeType}
          onClose={handleClose}
        />
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Уточнение данных расчета</DrawerTitle>
          <DrawerDescription>
            Заполните дополнительную информацию для более точного расчета
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <RequestCalcForm
            nodeId={nodeId}
            nodeType={nodeType}
            onClose={handleClose} // Передаем функцию закрытия
          />
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Закрыть</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
