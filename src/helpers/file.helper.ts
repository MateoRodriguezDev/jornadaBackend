import { BadRequestException } from "@nestjs/common";
import { FirebaseAdmin } from "src/firebase-config/firebase.setup";


const admin = new FirebaseAdmin();


  /**
   * @description Subir imágenes (Crear o Editar)
   * @param {Express.Multer.File} file
   */
  export const uploadIMG = async (file: Express.Multer.File) => {
    // Verifico si se envió algún archivo
    if (!file) {
        throw new BadRequestException('Must sent an image');
    }

    const app = admin.getApp();
    const bucket = app.storage().bucket();
    const fileUpload = bucket.file(`jornada/img/${file.originalname}`);

    // Cargo el archivo en Firebase Storage
    await fileUpload.save(file.buffer, {
        metadata: {
            contentType: file.mimetype,
        },
    });

    // Hago el archivo público
    await fileUpload.makePublic();
}


