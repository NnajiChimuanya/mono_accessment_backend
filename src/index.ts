import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import authRouter from "./routes/authRouter.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    credentials: true,
  })
);

try {
  mongoose.connect("mongodb://localhost:27017/mono");
  console.log("Connected");
} catch (err) {
  console.log(err);
  process.exit(1);
}

app.post("/code/:auth", (req: Request, res: Response) => {
  let code = req.params["auth"];
  let data = JSON.stringify({
    code: code,
  });

  var config = {
    method: "post",
    url: "https://api.withmono.com/account/auth",
    headers: {
      "Content-Type": "application/json",
      "mono-sec-key": "test_sk_EWhGo3D4muvGL47S3e2l",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      let id = response.data.id;

      let config = {
        method: "get",
        url: `https://api.withmono.com/accounts/${id}`,
        headers: {
          "mono-sec-key": "test_sk_EWhGo3D4muvGL47S3e2l",
        },
      };

      axios(config)
        .then(function (response) {
          res.json(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.post("/code/transactions/:_id", (req: Request, res: Response) => {
  let id = req.params["_id"];
  let config = {
    method: "get",
    url: `https://api.withmono.com/accounts/${id}/transactions`,
    headers: {
      "mono-sec-key": "test_sk_EWhGo3D4muvGL47S3e2l",
    },
  };

  axios(config)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.post("/code/unlink/:id", (req: Request, res: Response) => {
  let id = req.params["id"];
  let config = {
    method: "get",
    url: `https://api.withmono.com/accounts/${id}/unlink`,
    headers: {
      "mono-sec-key": "test_sk_EWhGo3D4muvGL47S3e2l",
    },
  };

  axios(config)
    .then(function (response) {
      res.json(response);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get("/code/statement/:id", (req: Request, res: Response) => {
  let id = req.params["id"];

  let config = {
    method: "get",
    url: `https://api.withmono.com/accounts/${id}/statement?period=last6months`,
    headers: {
      "mono-sec-key": "test_sk_EWhGo3D4muvGL47S3e2l",
    },
  };

  axios(config)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get("/code/expenses/:id", (req: Request, res: Response) => {
  let id = req.params["id"];

  let config = {
    method: "get",
    url: `https://api.withmono.com/accounts/${id}/debits`,
    headers: {
      "mono-sec-key": "test_sk_EWhGo3D4muvGL47S3e2l",
    },
  };

  axios(config)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get("/code/wallets/:id", (req: Request, res: Response) => {
  let id = req.params["id"];

  let config = {
    method: "get",
    url: `https://api.withmono.com/users/stats/wallet`,
    headers: {
      "mono-sec-key": "test_sk_EWhGo3D4muvGL47S3e2l",
    },
  };

  axios(config)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get("/code/shareholder", (req: Request, res: Response) => {
  let config = {
    method: "get",
    url: `https://api.withmono.com/v1/cac/company/6097094`,
    headers: {
      "mono-sec-key": "test_sk_EWhGo3D4muvGL47S3e2l",
    },
  };

  axios(config)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get("/", (req: Request, res: Response) =>
  res.send("This is the begining of the mono backend")
);
app.use("/auth", authRouter);

app.listen(3001, () => console.log("Now listening"));
