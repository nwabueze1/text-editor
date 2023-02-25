import React, { useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import FileUploader from "../FileUploader";
import List from "../List/List";
import ListContent from "../List/ListContent";
import Modal from "../Modal";
import RoundedButton from "../RoundedButton";
import { modules } from "../utils/modules";
import VideoEmbed from "../VideoEmbed";

export enum PROVIDERS {
  YOUTUBE = "youtube",
  VIMEO = "vimeo",
}
function RichTextEditor() {
  const [editorContent, setEditorContent] = useState(``);
  const [isOpen, setIsOpen] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [videoModal, setVideoModal] = useState(false);

  const handleEditorChange = (value: string) => {
    setEditorContent(value);
  };

  const embedImage = async (file: File) => {
    // Upload the image file to the server
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const url = await response.json();
    console.log(url);
    // Insert the URL of the uploaded image into the editor
    const state = editorContent.concat(`<img src=${url} />`);

    setEditorContent(state);
    resetFalse();
  };

  const embedVideo = (provider: PROVIDERS, link: string) => {
    let embedLink =
      provider === PROVIDERS.YOUTUBE
        ? "https://www.youtube.com/embed/" + link.split("v=")[1]
        : PROVIDERS.VIMEO
        ? "https://player.vimeo.com/video/" + link.split("/")[3]
        : "";

    if (embedLink.length === 0) return;

    const video = `<iframe width="560" height="315" src=${embedLink} frameborder="0" allowfullscreen></iframe>`;
    setEditorContent(editorContent.concat(video));
    resetFalse();
  };

  const resetFalse = () => {
    setVideoModal(false);
    setIsOpen(false);
    setImageModal(false);
  };

  React.useEffect(() => {}, []);
  return (
    <div className="container">
      <Modal open={imageModal} onClose={() => setImageModal(false)}>
        <FileUploader
          onFileSelected={(file) => embedImage(file)}
          onCancel={() => setImageModal(false)}
        />
      </Modal>
      <Modal open={videoModal} onClose={() => setVideoModal(false)}>
        <VideoEmbed
          onSubmit={(values) => embedVideo(values.provider, values.url)}
          onCancel={() => setVideoModal(false)}
        />
      </Modal>
      <ReactQuill
        theme="snow"
        modules={modules}
        value={editorContent}
        onChange={handleEditorChange}
      />
      <RoundedButton onClick={() => setIsOpen(!isOpen)} active={isOpen} />
      {isOpen && (
        <List>
          <p style={{ margin: 0, padding: "3px 5px" }}>Embeds</p>
          <ListContent
            subtitle={"jpeg,png"}
            title="Picture"
            iconName={"fa-file-image"}
            onClick={() => setImageModal(true)}
          />
          <ListContent
            subtitle={"JW player, youtube, vimeo"}
            title="Video"
            iconName={"fa-video"}
            onClick={() => setVideoModal(true)}
          />
          <ListContent
            subtitle={"Instagram, Twitter, Tiktok,Snapchat, Facebook"}
            title="Social"
            iconName={"fa-spinner"}
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </List>
      )}
    </div>
  );
}

export default RichTextEditor;
