import { ECollection } from "@/backend/common/constants/collections-enum";
import { EProductType } from "../domain/product-enums";

const getProductCollection = (productType: EProductType): ECollection => {
  switch (productType) {
    case EProductType.JERSEY:
      return ECollection.JERSEYS;
  }
};

export { getProductCollection };
