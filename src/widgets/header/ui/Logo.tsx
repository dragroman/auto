import Link from "next/link"
import Image from "next/image"

export const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/logo.svg"
        alt="Автомобили из Китая"
        width={100}
        height={40}
        className="hidden md:block"
      />
      <Image
        src="/logo-square.svg"
        alt="Автомобили из Китая"
        className="md:hidden"
        width={40}
        height={40}
      />
    </Link>
  )
}
