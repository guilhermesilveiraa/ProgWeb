import { Router } from "express";
import { checkAuth } from "../middlewares/checkAuth";

import mainController from "../controllers/main";
import majorController from "../controllers/major";
import authController from "../controllers/auth";

const router = Router()

//Auth Controller
router.get("/", authController.login);
router.get("/auth/signup", authController.signup);
router.post("/auth/signup", authController.signup);
router.get("/auth/login", authController.login);
router.post("/auth/login", authController.login);
router.post("/auth/logout", authController.logout);
router.get("/auth/logout", authController.logout);

//Major Controller
router.get("/major", majorController.index);
router.get("/major/create",checkAuth, majorController.create);
router.post("/major/create", majorController.create);
router.get("/major/read/:id", majorController.read);
router.get("/major/update/:id", majorController.update);
router.post("/major/update/:id", majorController.update);
router.delete("/major/remove/:id", majorController.remove);


//Main Controller
router.get("/create-cookie", mainController.createCookie);
router.get("/hb1", mainController.hb1);
router.get("/hb2", mainController.hb2);
router.get("/hb3", mainController.hb3);
router.get('/hb4', mainController.hb4);
router.get("/bem-vindo/:nome", mainController.bemvindo);
router.get("/about", mainController.about);
router.get("/lorem/:numParagraphs", mainController.lorem);

export default router;