"use client";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  Image as IKImage,
  upload,
  ImageKitProvider,
} from "@imagekit/next";
import { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import config from "@/lib/config";
import { CustomImageUploadProps } from "@/types";
import { toast } from "sonner"

const {
  env: {
    imagekit: { publicKey, privateKey, urlEndpoint },
  },
} = config;

const CustomImageUpload = ({ variant = "dark", placeholder = "Upload a file", onFileChange }: CustomImageUploadProps) => {
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<{ filePath: string | null }>({ filePath: null });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortController = new AbortController();

  // --- Extracted Styles Logic ---
  const styles = {
    button:
      variant === "dark"
        ? "bg-dark-300"
        : "bg-light-600 border-gray-100 border",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-400",
  };

  const authenticator = async () => {
    try {
        // const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
        const response = await fetch(`/api/auth/imagekit`);
        if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }
      const data = await response.json();
      return { 
        signature: data.signature, 
        expire: data.expire, 
        token: data.token, 
        publicKey: data.publicKey 
      };
    } catch (error) {
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

  const handleUpload = async () => {
    const fileInput = fileInputRef.current;
    if (!fileInput?.files?.length) {
      alert("Please select a file to upload");
      return;
    }

    const file = fileInput.files[0];
    setProgress(0);

    try {
      const { signature, expire, token, publicKey } = await authenticator();

      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name,
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
        abortSignal: abortController.signal,
      });

      if (uploadResponse.filePath) {
        const path = uploadResponse.filePath;
        
        // 1. Update local state
        setFile({ filePath: path });
        
        // 2. Call the prop (Checking for existence first to satisfy TS)
        if (onFileChange) {
          onFileChange(path); 
        }
    
        toast.success("File Uploaded successfully");
      }
    } catch (error) {
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
      } else {
        console.error("Upload error:", error);
      }
    }
  };

  return (
    <ImageKitProvider
          urlEndpoint={urlEndpoint}>
    <div className="flex flex-col gap-4">
      {/* Hidden native input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        onChange={handleUpload} 
      />

      {/* Styled Custom Button */}
      <button
        type="button"
        className={cn("upload-btn flex items-center gap-2 px-4 py-2 rounded-md", styles.button)}
        onClick={(e) => {
          e.preventDefault()
          if(fileInputRef.current){
            // @ts-ignore
            fileInputRef.current?.click()
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />

        <p className={cn("text-base", styles.placeholder)}>{placeholder}</p>
        
        {file.filePath && (
          <p className={cn("upload-filename ml-2", styles.text)}>{file.filePath}</p>
        )}
      </button>

      {/* Styled Progress Bar */}
      {progress > 0 && progress < 100 && (
        <div className="w-full rounded-full bg-green-200 h-4 overflow-hidden">
          <div 
            className="progress bg-green-500 h-full text-xs text-white flex items-center justify-center transition-all duration-300" 
            style={{ width: `${progress}%` }}
          >
            {Math.round(progress)}%
          </div>
        </div>
      )}
      
    {file.filePath && /\.(jpe?g|png|gif|webp|svg)$/i.test(file.filePath) && (
          <IKImage
          src={file.filePath}
          alt={file.filePath}
          width={500}
          height={500}
          className="rounded-lg"
          />
        )}
    </div>
    </ImageKitProvider>
  );
};

export default CustomImageUpload;