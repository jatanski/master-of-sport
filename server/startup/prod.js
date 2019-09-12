import helmet from "helmet";
import compression from "compression";

export const prod = app => {
  app.use(helmet());
  app.use(compression());
};
