import { validate } from "class-validator";
import { CreateJerseyDto } from "@/backend/modules/jersey/infrastructure/dto/create-jersey.dto";
import { EJerseyEdition } from "@/backend/modules/jersey/domain/jersey-enum";
import { GeneralUtils } from "@/backend/common/utils/general.util";

describe("Rules for editions in CreateJerseyDto: Is optional", () => {
  test("INPUT: undefined", () => {
    const obj = new CreateJerseyDto();
    obj.title = "title";
    obj.clubId = "clubId";
    obj.images = [new File([], "image")];
    obj.isRetro = false;
    obj.editions = undefined;
    (async () => {
      expect(await validate(obj)).toHaveLength(0);
    })();
  });

  test("INPUT: []", async () => {
    const obj = new CreateJerseyDto();
    obj.title = "title";
    obj.clubId = "clubId";
    obj.images = [new File([], "image")];
    obj.isRetro = false;
    obj.editions = [];
    (async () => {
      expect(await validate(obj)).toHaveLength(1);
    })();
  });

  test('INPUT: ["any text"]', () => {
    const obj = new CreateJerseyDto();
    obj.title = "title";
    obj.clubId = "clubId";
    obj.images = [new File([], "image")];
    obj.isRetro = false;
    obj.editions = ["any text"];
    (async () => {
      expect(await validate(obj)).toHaveLength(1);
    })();
  });

  test(`INPUT: [${EJerseyEdition.FAN}, ${EJerseyEdition.FAN}]`, async () => {
    const obj = new CreateJerseyDto();
    obj.title = "title";
    obj.clubId = "clubId";
    obj.images = [new File([], "image")];
    obj.isRetro = false;
    obj.editions = [EJerseyEdition.FAN, EJerseyEdition.FAN];
    (async () => {
      expect(await validate(obj)).toHaveLength(1);
    })();
  });

  test(`INPUT: [${EJerseyEdition.PLAYER}, "any text"]`, async () => {
    const obj = new CreateJerseyDto();
    obj.title = "title";
    obj.clubId = "clubId";
    obj.images = [new File([], "image")];
    obj.isRetro = false;
    obj.editions = [EJerseyEdition.PLAYER, "any text"];
    (async () => {
      expect(await validate(obj)).toHaveLength(1);
    })();
  });

  test(`INPUT: [${EJerseyEdition.FAN}, ${EJerseyEdition.PLAYER}, ${EJerseyEdition.FAN}]`, async () => {
    const obj = new CreateJerseyDto();
    obj.title = "title";
    obj.clubId = "clubId";
    obj.images = [new File([], "image")];
    obj.isRetro = false;
    obj.editions = [EJerseyEdition.FAN, EJerseyEdition.PLAYER, EJerseyEdition.FAN];
    (async () => {
      console.log(
        JSON.stringify(GeneralUtils.mapValidationErrorsToArrayString(await validate(obj)))
      );
      expect(await validate(obj)).toHaveLength(1);
    })();
  });

  test(`INPUT: [${EJerseyEdition.FAN}, ${EJerseyEdition.PLAYER}]`, async () => {
    const obj = new CreateJerseyDto();
    obj.title = "title";
    obj.clubId = "clubId";
    obj.images = [new File([], "image")];
    obj.isRetro = false;
    obj.editions = [EJerseyEdition.FAN, EJerseyEdition.PLAYER];
    (async () => {
      expect(await validate(obj)).toHaveLength(0);
    })();
  });
});
