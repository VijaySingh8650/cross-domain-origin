import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const redirectToValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  (req as any).redirect = true;
  next();
};
export const regenerateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let refreshToken: any = req.header("Refreshtoken");
  try {
    let refreshTokenVerification: any = jwt.verify(
      refreshToken,
      process.env.SECRET_KEY ?? "secret_key"
    );
    if (refreshTokenVerification?.email && refreshTokenVerification?.password) {
      let token = jwt.sign(
        {
          email: refreshTokenVerification?.email,
          password: refreshTokenVerification?.password,
        },
        process.env.SECRET_KEY ?? "secret_key",
        { expiresIn: "1m" }
      );

      if ((req as any).redirect) {
        (req as any).token = token;
        (req as any).refreshToken = refreshToken;
        (req as any).regenerate = true;
        next();
        return;
      } else {
        res
          .status(200)
          .send({ message: "Token is regenerated", token, refreshToken });
        return;
      }
    }

    res.status(200).send({ error: "InvalidTokenError", decoded: null });
    return;
  } catch (err: any) {
    res.status(200).send({ message: "Please login again" });
  }
};

export const validationOftoken = (
  req: Request & { token?: string },
  res: Response,
  next: NextFunction
): void => {
  let token: any = req.header("Authorization");
  let refreshToken: any = req.header("Refreshtoken");

  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY ?? "secret_key");
    
    if (decode) {
      if ((req as any)?.redirect) {
        (req as any).token = token;
        (req as any).refreshToken = refreshToken;
        next();
        return;
      } else {
        res.status(200).send({ message: "Token is valid" });
        return;
      }
    }
    return;
  } catch (err: any) {
    if (err?.name === "TokenExpiredError") {
      regenerateToken(req, res, next);
      return;
    }
    res.status(200).send({ error: "InvalidTokenError", decoded: null });
    return;
  }
};
