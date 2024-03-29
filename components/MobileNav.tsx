"use client"
import {
    Sheet,
    SheetClose,
    SheetContent,
    
    SheetTrigger,
  } from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
  

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <section className='w-full max-w-[264px] text-white'>
            <Sheet>
        <SheetTrigger asChild>
            <Image 
            src='/icons/hamburger.svg'
            height={36}
            width={36}
            alt='hamburger icon'
            className='cursor-pointer sm:hidden'
            />
        </SheetTrigger>
        <SheetContent side="left" className='border-none bg-dark-1'>
            <Link
          href="/"
          className='flex items-center gap-6'>
            <Image
            src="/icons/logo.svg"
            width={40}
            height={40}
            alt="Logo"
            className='cursor-pointer max-sm:size-10'
            />
            <p className='text-[26px] font-extrabold text-white max=sm:hidden'>Code Buddy
    </p>

          </Link>
          <div className='flex h-[calc(100vh-72px)]
          flex-col justify-between overflow-y-auto'>
            <SheetClose asChild>
              <section className='flex h-full flex-col gap-6 pt-16 text-whire'>

              {sidebarLinks.map((link) => {

                      const isActive = pathname === link.route || pathname.startsWith(link.route);

                      return (
                        <SheetClose asChild >
                          <Link
                        href={link.route}
                        key={link.label}
                        className={cn('flex gap-4 items-center p-4 rounded-lg w-full max-w-60', {
                          'bg-purple':isActive,
                        })}
                        >
                          <Image
                          src={link.imgURL}
                          alt={link.label}
                          width={20}
                          height={20}
                          />
                        <p className='font-semibold '>
                        {link.label}
                        </p>
                        </Link>
                      
                        </SheetClose>
                      )

                      })}

              </section>
            </SheetClose>

          </div>
        </SheetContent>
        </Sheet>

       </section>
  )
}

export default MobileNav