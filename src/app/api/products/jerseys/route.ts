import { ResponseCode } from "@/backend/common/constants";
import { ResponseModel } from "@/backend/common/entity/response-base.model";
import { GeneralUtils } from "@/backend/common/utils/general.util";
import { CreateJerseyUC } from "@/backend/modules/jersey/application/create-jersey.uc";
import { CreateJerseyDto } from "@/backend/modules/jersey/infrastructure/dto/create-jersey.dto";
import { ClubDatabase } from "@/backend/modules/shared/club/infrastructure/club.database";
import { ProductDatabase } from "@/backend/modules/shared/product/infrastructure/product.database";
import { AdminMiddleware } from "@/backend/modules/admin/application/admin.middleware";
import { AdminDatabase } from "@/backend/modules/admin/infrastructure/admin.database";
import { validate } from "class-validator";
import { NextRequest } from "next/server";

const adminDatabase = new AdminDatabase();
const productDatabase = new ProductDatabase();
const clubDatabase = new ClubDatabase();

const adminMiddleware = new AdminMiddleware(adminDatabase);
const createJersey = new CreateJerseyUC(productDatabase, clubDatabase);

export async function POST(req: NextRequest): Promise<ResponseModel> {
  if (!(await adminMiddleware.validateAuthByCookies(req.cookies)))
    return new ResponseModel({
      ...ResponseCode.UNAUTHORIZED,
      message: "No cuenta con los permisos.",
    });

  try {
    const formData = await req.formData();
    const data: Record<keyof CreateJerseyDto, any> = {
      title: formData.get("title" as keyof CreateJerseyDto),
      clubId: formData.get("clubId" as keyof CreateJerseyDto),
      editions: JSON.parse(formData.get("editions" as keyof CreateJerseyDto) as string),
      isRetro: JSON.parse(formData.get("isRetro" as keyof CreateJerseyDto) as string),
      images: formData.get("images" as keyof CreateJerseyDto),
    };

    const dataErrors = await validate(data);
    if (dataErrors.length !== 0)
      return new ResponseModel({
        ...ResponseCode["BAD REQUEST"],
        message: GeneralUtils.mapValidationErrorsToArrayString(dataErrors),
      });

    /* TODO: Verify if the files will be images. (lib: "file-type") */
    const images = data.images as any[];
    if (images.some((element) => !(element instanceof File)))
      return new ResponseModel({
        ...ResponseCode["BAD REQUEST"],
        message: "Formato de imagenes invalido.",
      });

    const result = await createJersey.execute(
      data.title,
      data.clubId,
      data.editions,
      data.isRetro,
      data.images
    );

    return new ResponseModel(result);
  } catch (error) {
    return new ResponseModel({
      ...ResponseCode["BAD REQUEST"],
      message: "Invalid request",
    });
  }
}
