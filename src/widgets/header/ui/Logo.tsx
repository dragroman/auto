import Link from "next/link"
import Image from "next/image"

export const Logo = () => {
  return (
    <Link href="/" className="text-2xl font-semibold no-underline">
      <Image
        src="/logo.svg"
        alt="Автомобили из Китая"
        width={100}
        height={40}
      />
    </Link>
  )
}
