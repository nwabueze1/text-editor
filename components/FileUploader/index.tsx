import React, { useState } from "react";
import ButtonContained from "../Button/ButtonContained";
import ButtonOutlined from "../Button/ButtonOutlined";

interface IFileUploader {
  onFileSelected: (file: File) => void;
  onCancel: () => void;
}
export default function FileUploader({
  onFileSelected,
  onCancel,
}: IFileUploader) {
  const [fileName, setFileName] = useState("");

  const fileRef = React.useRef();

  React.useEffect(() => {}, []);
  return (
    <div>
      <p className="upload_title">Upload image</p>
      {
        <p className="upload_subtitle">
          {fileName.length === 0 ? "File upload" : fileName}
        </p>
      }
      <div
        className="uploader"
        onClick={() => (fileRef.current as any).click()}
      >
        <button className="button">Import Image from Device</button>
      </div>
      <input
        type="file"
        ref={fileRef as any}
        className="input"
        accept=".png,.jpeg,.jpg"
        onChange={() => {
          const selectedFile = (fileRef.current as any).files[0];
          setFileName(selectedFile.name);
        }}
      />
      <ButtonContained
        onClick={() => {
          let selectedFile = (fileRef.current as any).files[0];
          if (!selectedFile) return alert("please select an image");
          onFileSelected(selectedFile as File);
        }}
      >
        Embed
      </ButtonContained>
      <ButtonOutlined onClick={onCancel}>Cancel</ButtonOutlined>
    </div>
  );
}
