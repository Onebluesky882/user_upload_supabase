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

const Uploader = () => {
  const [uppy] = useState(
    () =>
      new Uppy({
        restrictions: { allowedFileTypes: ["image/*"] },
      })
  );

  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
          <DialogDescription>seclect your photo</DialogDescription>
        </DialogHeader>
        <Dashboard id="dashboard" uppy={uppy} hideUploadButton />
        <button>upload</button>
      </DialogContent>
    </Dialog>
  );
};
export default Uploader;
