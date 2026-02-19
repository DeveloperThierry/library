"use client";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  Image as IKImage,
  Video as IKVideo,
  upload,
  ImageKitProvider,
} from "@imagekit/next";
import config from "@/lib/config";
const {
    env: {
      imagekit: { publicKey, privateKey, urlEndpoint },
    },
  } = config;

const BookVideo = ({ videoUrl }: { videoUrl: string }) => {
  return (
          <ImageKitProvider urlEndpoint={urlEndpoint}>
      
      <IKVideo
                src={videoUrl}
                controls={true}
                // width={500}
                // height={500}
                className="w-full rounded-xl"
              />
                  </ImageKitProvider>
  );
};
export default BookVideo;