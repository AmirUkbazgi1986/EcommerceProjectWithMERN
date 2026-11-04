import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    // console.log(token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorizedd Login Again!",
      });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("token_decode", token_decode);

    req.userId = token_decode.id;
    // console.log("req.body.userId", req.userId);
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export default authUser;
/*
My recommendation: Use req.userId rather than req.body.userId.

Remember the distinction:
- req.body → Data sent in the request body (typically POST, PUT, PATCH).
- req.params → Route parameters, such as /users/:id.
- req.query → Query parameters, such as /users?id=123.
- req.headers → Request headers, such as your authorization token.
- req.userId → Custom property that you attach to the request object in your authentication middleware.
*/
