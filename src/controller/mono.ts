import { Request, Response, Router } from "express";
import axios from "axios";

export const auth = (req: Request, res: Response) => {
  let code = req.params["auth"];
  console.log(code);
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
};

export const transactions = (req: Request, res: Response) => {
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
};

export const dataSync = (req: Request, res: Response) => {
  let id = req.params["_id"];
  let config = {
    method: "post",
    url: `https://api.withmono.com/accounts/${id}/sync`,
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
};

export const unlink = (req: Request, res: Response) => {
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
};

export const statement = (req: Request, res: Response) => {
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
};

export const expenses = (req: Request, res: Response) => {
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
};

export const wallets = (req: Request, res: Response) => {
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
};

export const shareholder = (req: Request, res: Response) => {
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
};
