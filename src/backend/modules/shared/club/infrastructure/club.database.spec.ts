/**
 * @jest-environment node
 */

import { ClubDatabase } from "./club.database";

describe("Tests for club database", () => {
  test("Find an existing club", async () => {
    const clubFromDB = {
      uid: "V6IhCar7QHAmvxuaiq5W",
      data: {
        leagueId: "9dOR6Mdb9kKdmTTNMdrn",
        name: "Real Madrid",
      },
    };
    expect(await new ClubDatabase().findById(clubFromDB.uid)).toEqual(clubFromDB.data);
  });
});
