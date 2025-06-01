import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { envs } from 'src/config';

let app: admin.app.App = null;

@Injectable()
export class FirebaseAdmin implements OnApplicationBootstrap {
  constructor() {}


  /**
   * @description
   * conecta a firebase con las keys de nuestro proyecto
   */
  async onApplicationBootstrap() {
    if (!app) {
      const serviceAccountPath = envs.firebase_service_account_key
      const storageBucket = envs.firebase_storage_bucket
      const serviceAccount = JSON.parse(serviceAccountPath);

      app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: storageBucket,
      });

      console.log('Conexion a firebase exitosa');
    }
  }

  /**
   * @description
   * te devuelve una instancia de firebase para poder utilizarla cuando la requerimos
   * 
   * @returns {admin.app.App} app
   */
  getApp(): admin.app.App {
    if (!app) {
      throw new Error('Firebase app has not been initialized');
    }
    return app;
  }
}
