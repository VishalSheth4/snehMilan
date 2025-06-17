import jwt from "jsonwebtoken";

const authenticateUser = (req, res, next) => {
  console.log("AuthenticateUser middleware hit");
  console.log(req.headers.authorization, "  Authorization Header");
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: "Unauthorized" });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    res.json({ message: "Unauthorized" });
    return;
  }

  try {
    // this payload will include the data which is encoded as access_token in the login api
    const payload = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    // @ts-ignore
    req.user = payload;
    next();
    return;
  } catch (e) {
    console.error(e);
    res.status(401);
    res.json({ message: "Unauthorized" });
    return;
  }
};

export default authenticateUser;
