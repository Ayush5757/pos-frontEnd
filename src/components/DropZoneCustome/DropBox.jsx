import { Box, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Resizer from "react-image-file-resizer";

const ImageUpload = ({
  onUpload,
  maxSizeMB,
  selectedImage,
  setSelectedImage,
}) => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024; // Convert MB to bytes
  const acceptedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
  const [error, setError] = useState(null);

  const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1000,
      1000,
      "JPEG",
      70,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });

  const onDrop = useCallback(async (acceptedFiles) => {
    console.log('validImages');
    const validImages = [];
    const invalidImages = [];
    console.log('acceptedFiles',acceptedFiles);
    acceptedFiles.forEach((file) => {
      if (file.size <= maxSizeBytes) {
        validImages.push(file);
      } else {
        invalidImages.push(file);
      }
    });
      if (validImages?.length === 0 && invalidImages?.length !== 0) {
      if(acceptedFileTypes.includes(invalidImages[0]?.type)){
        setError(null);
        const updatedImages = [...selectedImage, ...invalidImages];
        const image = await resizeFile(updatedImages[0]);
        setSelectedImage([image]);
        onUpload([image]);
      }else{
        setError("Invalid file(s) selected.");
      }
    } else {
      if(acceptedFileTypes.includes(validImages[0]?.type)){
        setError(null);
        const updatedImages = [...selectedImage, ...validImages];
        const image = await resizeFile(updatedImages[0]);
        setSelectedImage([image]);
        onUpload([image]);
      }else{
        setError("Invalid file(s) selected.");
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      accept: acceptedFileTypes,
      onDrop,
      multiple: false,
    });
  return (
    <Box
      className="image-upload"
      style={{
        padding: "0 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        style={{ width: "70%" }}
        {...getRootProps()}
        className={`dropzone ${isDragActive ? "active" : ""} ${
          isDragReject ? "reject" : ""
        }`}
      >
        <input {...getInputProps()} />
        <IconPlus color="#a1a8af" />
      </Box>
      {/* {maxSizeMB && <Text align="center">Maximum file size: {maxSizeMB}MB</Text>} */}
      {error && <Text color="red" align="center">{error}</Text>}
      {selectedImage && (
        <Box className="selected-image">
          {selectedImage.map((images) => {
            return <>
              <img src={URL.createObjectURL(images)} alt="Selected" />
            </>
          })}
        </Box>
      )}
    </Box>
  );
};

export default ImageUpload;
