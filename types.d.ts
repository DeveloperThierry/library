import { FieldValues } from "react-hook-form";

interface CustomFileUploadProps {
  type:'image'|'video'
  accept:string
  folder:string
  variant?: "dark" | "light";
  placeholder?: string;
  onFileChange:(filePath:string) => void;
}

interface FileUploadProps {
  type:'image'|'video'
  accept:string
  folder:string
  variant?: "dark" | "light";
  placeholder?: string;
  onFileChange:(filePath:string) => void;
}

interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    rating: number;
    totalCopies: number;
    availableCopies: number;
    description: string;
    coverColor: string;
    coverUrl: string;
    videoUrl: string;
    summary: string;
    isLoanedBook?:boolean
    // createdAt: Date | null;
  }

  
interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
}

interface BookParams {
  title: string;
  author: string;
  genre: string;
  rating: number;
  coverUrl: string;
  coverColor: string;
  description: string;
  totalCopies: number;
  videoUrl: string;
  summary: string;
}

interface BorrowBookParams {
  bookId: string;
  userId: string;
}

interface BookCover {
  className?:string
  variant?:BookCoverVariant
  coverColor:string
  coverUrl:string
}

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide" | "default"


const variantStyles:Record<BookCoverVariant, string> = {
  default:"book-cover",
  extraSmall:"book-cover-extra_small",
  small:"book-cover_small",
  medium:"book-cover_medium",
  regular:"book-cover_regular",
  wide:"book-cover_wide",
}

interface BookList {
  title:string,
  books:Book[],
  containerClassName?:string
}


interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}


interface BookFormProps extends Partial<Book> {
  type?: "create" | "update";
}