import multer from "multer";
import nc from "next-connect";
import path from "path";
import fs from "fs";

const storage = multer.memoryStorage();
const upload = multer({ storage });

// const upload = multer({ storage });

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    (res as any).status(500).send("something broke");
  },
  onNoMatch: (req, res) => {
    (res as any).status(404).end("Page is not found");
  },
})
  .use(upload.single("file"))
  .post(async (req, res) => {
    const fileBuffer = (req as any).file.buffer;
    const fileName = (req as any).file.originalname;
    const filePath = `/uploads/${fileName}`;

    fs.writeFile(`./public${filePath}`, fileBuffer, (err) => {
      if (err) {
        return (res as any).status(500).json({ message: err.message });
      }
      return (res as any).status(200).json(filePath);
    });
  });

export default handler;
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
