import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { config } from "dotenv";
const serviceAccount = require("../firebase-admin-credentials.json");
config({ path: ".env.local" });
initializeApp({ credential: cert(serviceAccount) });
type Params = { uid: string };
const setCustomClaimsForAdmin = async ({ uid }: Params) => {
  getAuth()
    .setCustomUserClaims(uid, {
      admin: true,
    })
    .then(() => console.log("✅ Customized claims added correctly"))
    .catch((e: any) =>
      console.log("❌ Customized claims have not been added correctly:", e)
    );
};

/* setCustomClaimsForAdmin({ uid: "" }); */
