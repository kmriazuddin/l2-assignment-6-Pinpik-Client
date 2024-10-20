import { useUploadImageMutation } from "@/redux/features/uploadImage/uploadImage.api";
import { useState } from "react";
import toast from "react-hot-toast";

const UploadImageComponent = ({
  onImageUpload,
}: {
  onImageUpload: (link: string) => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadImage, { isLoading, isSuccess, isError }] =
    useUploadImageMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return toast.error("No file");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await uploadImage({ data: formData }).unwrap();
      console.log(res);
      if (res.success === true) {
        toast.success("Image uploaded successfully");
        onImageUpload(res.data.link);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="flex items-center mb-5 lg:flex-row flex-col gap-5 lg:gap-0">
      <input
        className="file-input file-input-bordered w-full max-w-xs mr-5"
        type="file"
        onChange={handleFileChange}
      />
      <button
        className="btn btn-md btn-outline btn-info mr-3"
        onClick={handleUpload}
        disabled={isLoading}
      >
        {isLoading ? (
          <button className="btn">
            <span className="loading loading-spinner"></span>
            Uploading
          </button>
        ) : (
          "Upload Image"
        )}
      </button>
      {isSuccess && <p className="text-cyan-500">Upload successful!</p>}
      {isError && <p className="text-rose-500">Error uploading:</p>}
    </div>
  );
};

export default UploadImageComponent;
