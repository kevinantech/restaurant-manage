import { ResponseCode } from "@/backend/common/constants";
import { ResponseModel } from "@/backend/common/entity/response-base.model";
import { LeagueUC } from "@/backend/modules/league/application/league.uc";
import { CreateLeagueDto } from "@/backend/modules/league/infrastructure/dtos/create-league.dto";
import { LeagueDatabase } from "@/backend/modules/league/infrastructure/league.database";
import { AdminMiddleware } from "@/backend/modules/admin/application/admin.middleware";
import { AdminDatabase } from "@/backend/modules/admin/infrastructure/admin.database";
import { validate } from "class-validator";
import { NextRequest } from "next/server";

const adminDatabase = new AdminDatabase();
const adminMiddleware = new AdminMiddleware(adminDatabase);
const leagueDatabase = new LeagueDatabase();
const leagueUseCase = new LeagueUC(leagueDatabase);

/**
 * Get all leagues.
 * @param req
 */
export async function GET(req: NextRequest): Promise<ResponseModel> {
  if (!(await adminMiddleware.validateAuthByCookies(req.cookies)))
    return new ResponseModel({
      ...ResponseCode.UNAUTHORIZED,
      message: "No cuenta con los permisos.",
    });

  const result = await leagueUseCase.getAll();
  return new ResponseModel(result);
}

/**
 * Create a league.
 * @param req
 * @returns
 */
export async function POST(req: NextRequest): Promise<ResponseModel> {
  if (!(await adminMiddleware.validateAuthByCookies(req.cookies)))
    return new ResponseModel({
      ...ResponseCode.UNAUTHORIZED,
      message: "No cuenta con los permisos.",
    });

  const data = (await req.json()) as CreateLeagueDto;
  if ((await validate(data)).length !== 0)
    return new ResponseModel({
      ...ResponseCode["BAD REQUEST"],
      message: "Formato de datos incorrecto.",
    });

  const result = await leagueUseCase.create(data.name);
  return new ResponseModel(result);
}
