import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { mockPark } from "../../mocks/ParksMocks";
import store from "../../redux/store/store";
import Park from "./Park";

describe("Given a Park component", () => {
  describe("When it is instanted", () => {
    test("Then it should render an h3, a picture and two buttons", () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <Park {...mockPark} />
          </Provider>
        </BrowserRouter>
      );
      const picture = screen.getByRole("img");

      expect(picture).toBeInTheDocument();
    });
  });

  describe("When it is instanted with invalid pictures", () => {
    test("Then it should render an the default picture", () => {
      const park = {
        ...mockPark,
        photos: ["invalid"],
        photosBackup: ["invalidBackup"],
      };
      render(
        <BrowserRouter>
          <Provider store={store}>
            <Park {...park} />
          </Provider>
        </BrowserRouter>
      );
      const picture = screen.getByRole("img") as HTMLImageElement;
      expect(picture).toBeInTheDocument();

      fireEvent.error(picture);

      expect(picture.src).toEqual("http://localhost/invalidBackup");

      fireEvent.error(picture);
      expect(picture.src).toEqual("http://localhost/images/columpiaDa.png");
    });
  });
});
