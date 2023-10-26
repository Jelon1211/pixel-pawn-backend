import { express } from "../server";
const router = express.Router();
const path = require("path");

router.get("^/$|index(.html)?", (reg: any, res: any) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

module.exports = router;
