'use client'
import { cn } from "@/lib/utils"
import Image from "next/image"
import BookCoverSvg from "./BookCoverSvg"
import { BookCoverProps, BookCoverVariant } from "@/types"
import config from "@/lib/config"

const variantStyles:Record<BookCoverVariant, string> = {
  default:"book-cover",
  extraSmall:"book-cover-extra_small",
  small:"book-cover_small",
  medium:"book-cover_medium",
  regular:"book-cover_regular",
  wide:"book-cover_wide",
}

const BookCover = ({className, variant="regular", coverColor="#012B48", coverUrl="https://placehold.co/400x600.png"}:BookCoverProps) => {
  return (
    <div className={cn("relative transition-all duration 300", variantStyles[variant], className)}>
      <BookCoverSvg coverColor={coverColor}/>
      <div className="absolute z-10" style={{left:"12%", width:"87.5%", height:"88%"}}>
      
        <Image src={`${config.env.imagekit.urlEndpoint}${coverUrl}`} alt="book cover" fill className="rounded-sm object-fill"/>

        {/* <Image src={coverUrl} alt="book cover" fill className="rounded-sm object-fill"/> */}
       

      </div>
    </div>
  )
}

export default BookCover