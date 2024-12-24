import { Dashboard } from "@uppy/react";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import { Uppy } from "@uppy/core";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import Tus from "@uppy/tus";
import supabase from "@/utils/supabase";

const projectId = "psfdpxbojqqbsmatjvum";

const Uploader = () => {
  const [user, setUser] = useState<any | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [uppy, setUppy] = useState<Uppy | null>(null);

  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      setUser(data);
      setSession(data.session);
    }
  };

  useEffect(() => {
    if (session) {
      const uppyInstance = new Uppy({
        restrictions: { allowedFileTypes: ["image/*"] },
      }).use(Tus, {
        endpoint: `https://${projectId}.supabase.co/storage/v1/upload/resumable`,
        headers: {
          authorization: `Bearer ${session.access_token}`,
          "x-upsert": "true",
        },
        allowedMetaFields: [
          "bucketName",
          "objectName",
          "contentType",
          "cacheControl",
        ],
      });
      uppyInstance.on("file-added", (file) => {
        file.meta = {
          ...file.meta,
          bucketName: "images",
          contentType: file.type,
        };
      });
      setUppy(uppyInstance);
    }
  }, [session]);

  const handleUpload = () => {
    if (uppy && user) {
      uppy.getFiles().forEach((file) => {
        uppy.setFileMeta(file.id, {
          objectName: `${user.id}/${file.name}`,
        });
      });
      uppy
        .upload()
        .then((result) => {
          console.log("Upload result:", result);
        })
        .catch((error) => {
          console.error("Upload failed:", error);
        });
    }
  };
  if (!uppy) {
    return <div>Loading uploader...</div>; // Loading state while Uppy is being initialized
  }

  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
          <DialogDescription>seclect your photo</DialogDescription>
        </DialogHeader>
        <Dashboard id="dashboard" uppy={uppy} hideUploadButton />
        <button onClick={handleUpload}>upload</button>
      </DialogContent>
    </Dialog>
  );
};
export default Uploader;
