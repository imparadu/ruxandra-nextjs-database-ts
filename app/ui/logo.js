import Image from "next/image";
import Link from "next/link";

export default function RuxandraLogo() {
    return (
      <Link href="/" className="bg-white flex justify-center">
        <Image
          src="/Logo_maybe.png"
          width={416}
          height={96}
          className="xxs:hidden xs:hidden h-24 w-[26rem] bg-no-repeat bg-center block mt-1 bg-contain"
          alt="desktop version"
        />
        <Image
          src="/Logo horizontal mobile-03.svg"
          width={288}
          height={32}
          className="block bg-contain xxs:h-8 xs:h-8 w-72 bg-no-repeat bg-center s:hidden md:hidden: lg:hidden "
          alt="mobile version"
        />
      </Link>
    );
}
