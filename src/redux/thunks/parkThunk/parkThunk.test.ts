import "../../../mocks/server";
import { loadParksActionCreator } from "../../features/parksSlice/parkSlice";
import { loadParksThunk } from "./parkThunk";

describe("Given a loadParks function", () => {
  describe("When it is called", () => {
    test("It should dispatch loadParksActionCreator with the list of all parks", async () => {
      const dispatch = jest.fn();
      const parkColectionData = {
        page: 0,
        pageSize: 10,
        next: undefined,
        previous: undefined,
        total: 0,
        results: [
          {
            id: "2",
            name: "parque bonito",
            description: "un parque muy bonito",
            photos: ["photo1.png, photo2.png"],
            location: {
              type: {
                type: "elpunto",
                enum: ["Point"],
              },
              coordinates: {
                type: [4567, 5764],
              },
            },
            details: ["aga", "bar"],
            owner: "1",
          },
        ],
      };
      const loadColectionAction = loadParksActionCreator(parkColectionData);
      const thunk = loadParksThunk();
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledWith(loadColectionAction);
    });
  });
});