import React from "react";
import ImageUpload from "./DropBox";
import { useStyles } from "./style";
import { TextN1 } from "../Text";

function DropZoneCustome({maxSizeMB,imageList,selectedImage,setSelectedImage}) {
  const { classes } = useStyles(); 
  const handleImageUpload = (imageFile) => {
    imageList(imageFile);
  };

  return (
    <div className={classes.DropZoneBox}>
      <TextN1 className={classes.Heading}>Image Upload</TextN1>
      <ImageUpload 
      onUpload={handleImageUpload} 
      maxSizeMB={maxSizeMB} 
      setSelectedImage={setSelectedImage} 
      selectedImage={selectedImage}/>
    </div>
  );
}

export default DropZoneCustome;
