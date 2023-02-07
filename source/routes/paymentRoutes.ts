import { Router } from "express";
import { Container } from "typedi";

import { PaymentController } from "../controllers/paymentController";

const router = Router();

const paymentController = Container.get(PaymentController);


router.get("/record-subs", paymentController.getRecordSubscription.bind(paymentController));

router.post("/payment", paymentController.getPaymentLink.bind(paymentController));
router.post("/subscription", paymentController.getSubscriptionLink.bind(paymentController));
router.post("/notification", paymentController.getNotification.bind(paymentController));

export { router as paymentRouter };