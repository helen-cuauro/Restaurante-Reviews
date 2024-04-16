import express from "express";
import userRouter from "./routers/user-router";
import { authenticateHandler } from "./middlewares/authenticate";
import errorHandler from "./middlewares/error";
import { authorize } from "./middlewares/authorize";
import restaurantsRouter from "./routers/restaurants-router";
import handleReviews from "./middlewares/handleReviews";
import logRequest from "./middlewares/logRequest";
import reviewRouter from "./routers/reviews-router";
import authRouter from "./routers/auth-router";

const app = express();
const port = 5500;

app.use(express.json());
app.use(logRequest);
app.use("/", authRouter);
app.use("/", userRouter);
app.use("/restaurants", restaurantsRouter);
app.use("/restaurants/:id/reviews", handleReviews, reviewRouter);
app.use("/reviews", reviewRouter);

app.get("/admin", authenticateHandler, authorize("admin"), (req, res) => {
  res.json({ ok: true, message: "Bienvenido al panel de administración" });
});

app.use(errorHandler);
app.listen(port, () => console.log(`Escuchando al puerto ${port}`));
