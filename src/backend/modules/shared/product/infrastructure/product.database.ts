import { EStoragePaths } from "@/backend/common/constants/storage-paths";
import { GeneralUtils } from "@/backend/common/utils/general.util";
import { FirebaseAdmin } from "@/firebase/firebase-admin";
import { IProductRepository } from "../domain/product.repository";
import { ProductValue } from "../domain/product.value";
import { getProductCollection } from "./product-collections";

export class ProductDatabase implements IProductRepository {
  async add(product: ProductValue): Promise<{ id: string }> {
    const { id } = await FirebaseAdmin.getInstance()
      .db.collection(getProductCollection(product.type))
      .add(product);
    return { id };
  }

  async addImages(files: File[]): Promise<string[]> {
    return await Promise.all(
      files.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        const savingPath =
          EStoragePaths.PRODUCTS +
          GeneralUtils.generateUUID() +
          "." +
          GeneralUtils.getFileExtension(file.name);
        const fileRef = FirebaseAdmin.getInstance().storage.bucket().file(savingPath);
        await fileRef.save(buffer, { contentType: file.type });
        return await FirebaseAdmin.getInstance().getDownloadURL(fileRef);
      })
    );
  }
}
