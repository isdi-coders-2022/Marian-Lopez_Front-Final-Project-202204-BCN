import "../../../mocks/server";
import { loginActionCreator } from "../../features/userSlice/userSlice";
import { loginThunk } from "./userThunk";

jest.mock("jwt-decode", () => () => ({ username: "marian", name: "marian" }));

describe("Given a loginThunk function", () => {
  describe("When it is called", () => {
    test("It should dispatch loginActionCreator with the data from the token", async () => {
      const dispatch = jest.fn();

      const expectedData = {
        username: "marian",
        name: "marian",
      };
      const userData = {
        username: "marian",
        password: "password",
        name: "marian",
        email: "test",
        city: "Barcelona",
      };

      const expectedAction = loginActionCreator(expectedData);

      const thunk = loginThunk(userData);
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });
});
