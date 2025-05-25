import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui/dialog"
import { TableCell, TableRow } from "@shared/ui/table"
import { Info } from "lucide-react"

const formatNumber = (num: number) => {
  return new Intl.NumberFormat("ru-RU").format(Math.round(num))
}

export const ResultsTableRow = ({
  title,
  results,
  tooltip,
  currency,
}: {
  title: string
  results: number
  tooltip?: string
  currency?: string
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
              <Info className="w-4 h-4" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogDescription>{tooltip}</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
        {formatNumber(results)} {currency}
      </TableCell>
    </TableRow>
  )
}
