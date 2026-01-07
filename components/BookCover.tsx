import { cn } from "@/lib/utils"

const BookCover = ({className, variant="regular", coverColor="#012B48", coverUrl="https://placehold.co/400x600.png"}:BookCover) => {
  return (
    <div className={cn("relative-transition-all duration 300")}>BookCover</div>
  )
}

export default BookCover