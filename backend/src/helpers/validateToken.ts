import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "ngcash2022";

interface IJwtDecoded {
  userId: string;
  iat: number;
  exp: number;
}

export default function validateToken(authorization: string | undefined) {
  const token = authorization ? authorization : "";
  let userId;
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return { status: "Token inválido." };
    userId = (<IJwtDecoded>decoded).userId;
  });
  return userId;
}
