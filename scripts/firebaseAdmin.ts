import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

import serviceAccount from "../secrets/vivero-life-firebase-adminsdk-fbsvc-87ab151bdc.json";

const app =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential: cert(serviceAccount as Record<string, string>),
      });

export const adminDb = getFirestore(app);