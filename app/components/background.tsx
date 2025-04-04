import Image from "next/image";
import Logo from "$root/public/Logo.svg";

export default function Background() {
    return (
        <div className="area bottom-0 bg-[#4e54c8] dark:bg-black">
            <ul className="circles">
                <Image src={Logo} alt="logo"></Image>
                <Image src={Logo} alt="logo"></Image>
                <Image src={Logo} alt="logo"></Image>
                <Image src={Logo} alt="logo"></Image>
                <Image src={Logo} alt="logo"></Image>
                <Image src={Logo} alt="logo"></Image>
                <Image src={Logo} alt="logo"></Image>
                <Image src={Logo} alt="logo"></Image>
                <Image src={Logo} alt="logo"></Image>
                <Image src={Logo} alt="logo"></Image>
            </ul>
        </div>
    )
}
