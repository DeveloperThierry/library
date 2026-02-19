"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import { toast } from "@/hooks/use-toast";
import { borrowBook } from "@/lib/actions/book";
import { BorrowBookProps } from "@/types";
import { toast } from "sonner";



const BorrowBook = ({userId, bookId, borrowingEligibility:{isEligible, message}}: BorrowBookProps) => {
    const router = useRouter()
    const [borrowing, setBorrowing] = useState(false)

    const handleBorrowBook = async () => {
        if (!isEligible) {
          toast(message);
          return
        }
    
        setBorrowing(true);
    
        try {
          const result = await borrowBook({ bookId, userId });
    
          if (result.success) {
            toast.success("Book borrowed successfully");
            router.push("/");
          } else {
            toast.error(result.error);
          }
        } catch (error) {
          toast.error("An error occurred while borrowing the book");
        } finally {
          setBorrowing(false);
        }
      };
  return (
    <>
         <Button className="book-overview_btn" onClick={handleBorrowBook}>
                  <Image src="/icons/book.svg" alt="book" width={20} height={20}/>
                  <p className="font-bebas-neue text-xl text-dark-100">{borrowing?"Borrowing ...":"Borrow Book"}</p>
                </Button></>
  )
}

export default BorrowBook