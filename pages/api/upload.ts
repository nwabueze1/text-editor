import multer from "multer";
import nc from "next-connect";
import path from "path";

const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});

const upload = multer({ storage });

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
