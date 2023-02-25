import multer from "multer";
import nc from "next-connect";
import path from "path";
import fs from "fs";

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      const tmpFolder = "./public/uploads"; // Change this to your preferred temporary folder path
      fs.mkdir(tmpFolder, { recursive: true }, (err) => {
        if (err) throw err;
        callback(null, tmpFolder);
      });
    },
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const extension = path.extname(file.originalname);
      callback(null, file.fieldname + "-" + uniqueSuffix + extension);
    },
  }),
});

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
    (res as any)
      .status(200)
      .send(JSON.stringify("/uploads/" + (req as any).file.filename));
  });

export default handler;
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
