import React from 'react';
import Link, {LinkProps} from "next/link";
import {cn} from "@/lib/utils";
import Image from "next/image";

interface NavLinkProps extends LinkProps {
    text: string;
    isActive?: boolean;
    icon?: string;
    activeIcon?: string;
    iconWidth?: number;
    iconHeight?: number;
}

const NavLink = ({isActive = false, text, icon, iconWidth = 22, iconHeight = 24, activeIcon, href, ...props}: NavLinkProps) => {
    return (
    <Link href={href} className={cn("flex gap-3 items-center justify-center h-[66px] py-4 px-8 rounded-md", {'bg-violent-90 text-gray-0': isActive})} {...props}>
        {icon && <Image src={icon} alt="icon" height={iconHeight} width={iconWidth} className={cn({'hidden': isActive})}/>}
        {activeIcon && <Image src={activeIcon} alt="icon" height={iconHeight} width={iconWidth} className={cn("hidden", {'block': isActive})}/>}
        <p className="text-lg font-bold uppercase">{text}</p>
        </Link>
    );
};

export default NavLink;