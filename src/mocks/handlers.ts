import { rest } from "msw";
import { mockPark, mockParksPage } from "./ParksMocks";

export const usersHandlers = [
  rest.post(`${process.env.REACT_APP_API_URL}/users/login`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        token: "mocktoken",
      })
    );
  }),
  rest.get(
    `${process.env.REACT_APP_API_URL}/users/account`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          id: "1234",
          name: "Test user",
          username: "testuser",
          email: "testemail",
          city: "barcelona",
          favParks: [],
        })
      );
    }
  ),

  rest.post(
    `${process.env.REACT_APP_API_URL}/users/register`,
    (req, res, ctx) => {
      return res(
        ctx.status(201),
        ctx.json({
          username: "marianlop",
        })
      );
    }
  ),

  rest.get(`${process.env.REACT_APP_API_URL}/parks/list`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockParksPage));
  }),

  rest.delete(`${process.env.REACT_APP_API_URL}/parks/8`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ msg: "Park deleted" }));
  }),

  rest.post(`${process.env.REACT_APP_API_URL}/parks/`, (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(mockPark));
  }),
  rest.get(
    `${process.env.REACT_APP_API_URL}/parks/629f8aec8c2b3037ff6aeb4d`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockPark));
    }
  ),
  rest.put(
    `${process.env.REACT_APP_API_URL}/users/addfavourite`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({}));
    }
  ),
  rest.put(
    `${process.env.REACT_APP_API_URL}/users/deletefavourite`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({}));
    }
  ),

  rest.put(
    `${process.env.REACT_APP_API_URL}/parks/629f8aec8c2b3037ff6aeb4d`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockPark));
    }
  ),
];
