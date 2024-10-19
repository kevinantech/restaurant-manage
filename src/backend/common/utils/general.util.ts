import { ValidationError } from "class-validator";
import { v4 as uuid } from "uuid";

const SKU_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const SKU_SIZE = 8;

export class GeneralUtils {
  public static generateUUID(): string {
    return uuid();
  }

  public static generateProductSKU(key: string): string {
    let result = key.concat("-");
    for (let i = 0; i < SKU_SIZE; i++) {
      const indice = Math.floor(Math.random() * SKU_CHARACTERS.length);
      result += SKU_CHARACTERS.charAt(indice);
    }
    return result;
  }

  public static getFileExtension(filename: string): string {
    const extensionDotIndex = filename.lastIndexOf(".");
    const extension = filename.slice(extensionDotIndex + 1, filename.length);
    return extension;
  }

  public static mapValidationErrorsToArrayString(errors: ValidationError[]): string[] {
    const formattedErrors: string[] = errors.reduce((acc: string[], error) => {
      if (error.constraints) {
        Object.values(error.constraints).forEach((message) =>
          acc.push(message.charAt(0).toUpperCase() + message.slice(1))
        );
      }
      return acc;
    }, []);

    return formattedErrors;
  }
}
