import { initializeApp, cert, App, getApps } from "firebase-admin/app";
import { Auth, getAuth } from "firebase-admin/auth";
import { Firestore, getFirestore } from "firebase-admin/firestore";
import { Storage, getStorage } from "firebase-admin/storage";
import { getDownloadURL } from "firebase-admin/storage";

/** TODO: Set at .env */
const defaultBucket = "jerseys-goat-7f288.appspot.com";

export class FirebaseAdmin {
  private static instance: FirebaseAdmin;
  app: App;
  auth: Auth;
  db: Firestore;
  storage: Storage;
  getDownloadURL: typeof getDownloadURL;

  private constructor() {
    this.app = this.getApp();
    this.auth = getAuth(this.app);
    this.db = getFirestore(this.app);
    this.storage = getStorage(this.app);
    this.getDownloadURL = getDownloadURL;
  }

  public static getInstance(): FirebaseAdmin {
    if (!FirebaseAdmin.instance) FirebaseAdmin.instance = new FirebaseAdmin();
    return FirebaseAdmin.instance;
  }

  /**
   * Avoid duplicates (may throw exceptions if duplicates occur)
   */
  private getApp(): App {
    const apps = getApps();
    return apps.length === 0
      ? initializeApp({
          credential: cert(require("../../firebase-admin-credentials.json")),
          storageBucket: defaultBucket,
        })
      : apps[0];
  }
}
