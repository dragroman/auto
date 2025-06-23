import { Alert, AlertDescription, AlertTitle } from "@shared/ui/alert"
import {
  AlertCircleIcon,
  HelpCircle,
  XIcon,
  BookText,
  MapPin,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@shared/ui/dialog"
import { TableCell, TableRow } from "@shared/ui/table"
import { Button } from "@shared/ui/button"
import Link from "next/link"

const formatNumber = (num: number) => {
  return new Intl.NumberFormat("ru-RU").format(Math.round(num))
}

export const ResultsTableRow = ({
  title,
  results,
  tooltip,
  currency,
  info,
  url_name,
  url,
  document,
}: {
  title: string
  results: number
  tooltip?: string
  currency?: string
  info?: string
  url_name?: string | string[]
  url?: string | string[]
  document?: boolean
}) => {
  return (
    <TableRow>
      <TableCell className="break-words whitespace-normal px-4">
        {title}
      </TableCell>
      <TableCell className="flex align-middle justify-end text-right">
        {tooltip && (
          <Dialog>
            <DialogTrigger>
              <HelpCircle className="w-4 h-4" />
            </DialogTrigger>
            <DialogContent
              className="bg-transparent shadow-none border-none rounded-none"
              hideCloseButton
            >
              <div className="flex justify-end">
                <DialogClose className="text-white hover:opacity-60 transition-opacity">
                  <XIcon />
                </DialogClose>
              </div>
              <Alert>
                <HelpCircle />
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription className="overflow-y-auto max-h-[200px] text-gray-700">
                  <p>{tooltip}</p>
                </AlertDescription>
              </Alert>
              {info && (
                <Alert variant="info">
                  <AlertCircleIcon />
                  <AlertTitle>Примечание:</AlertTitle>
                  <AlertDescription className="overflow-y-auto max-h-[200px] text-gray-700">
                    <p>{info}</p>
                    {url_name &&
                    url &&
                    Array.isArray(url_name) &&
                    Array.isArray(url) ? (
                      url_name.map((name, idx) =>
                        url[idx] ? (
                          <Button asChild key={idx}>
                            <Link href={url[idx]}>
                              {document ? (
                                <BookText className="h-5 w-5" />
                              ) : (
                                <MapPin className="h-5 w-5" />
                              )}
                              {name}
                            </Link>
                          </Button>
                        ) : null
                      )
                    ) : url_name && url ? (
                      <Button asChild>
                        <Link
                          href={
                            typeof url === "string"
                              ? url
                              : url[0] || "/default-url"
                          }
                        >
                          <MapPin className="h-5 w-5" />
                          {typeof url_name === "string"
                            ? url_name
                            : url_name[0]}
                        </Link>
                      </Button>
                    ) : null}
                  </AlertDescription>
                </Alert>
              )}
            </DialogContent>
          </Dialog>
        )}
        {formatNumber(results)} {currency}
      </TableCell>
    </TableRow>
  )
}
