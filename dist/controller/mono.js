"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shareholder = exports.wallets = exports.expenses = exports.statement = exports.unlink = exports.dataSync = exports.transactions = exports.auth = void 0;
const axios_1 = __importDefault(require("axios"));
const auth = (req, res) => {
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
    (0, axios_1.default)(config)
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
        (0, axios_1.default)(config)
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
exports.auth = auth;
const transactions = (req, res) => {
    let id = req.params["_id"];
    let config = {
        method: "get",
        url: `https://api.withmono.com/accounts/${id}/transactions`,
        headers: {
            "mono-sec-key": "test_sk_EWhGo3D4muvGL47S3e2l",
        },
    };
    (0, axios_1.default)(config)
        .then(function (response) {
        res.json(response.data);
    })
        .catch(function (error) {
        console.log(error);
    });
};
exports.transactions = transactions;
const dataSync = (req, res) => {
    let id = req.params["_id"];
    let config = {
        method: "post",
        url: `https://api.withmono.com/accounts/${id}/sync`,
        headers: {
            "mono-sec-key": "test_sk_EWhGo3D4muvGL47S3e2l",
        },
    };
    (0, axios_1.default)(config)
        .then(function (response) {
        res.json(response.data);
    })
        .catch(function (error) {
        console.log(error);
    });
};
exports.dataSync = dataSync;
const unlink = (req, res) => {
    let id = req.params["id"];
    let config = {
        method: "get",
        url: `https://api.withmono.com/accounts/${id}/unlink`,
        headers: {
            "mono-sec-key": "test_sk_EWhGo3D4muvGL47S3e2l",
        },
    };
    (0, axios_1.default)(config)
        .then(function (response) {
        res.json(response);
    })
        .catch(function (error) {
        console.log(error);
    });
};
exports.unlink = unlink;
const statement = (req, res) => {
    let id = req.params["id"];
    let config = {
        method: "get",
        url: `https://api.withmono.com/accounts/${id}/statement?period=last6months`,
        headers: {
            "mono-sec-key": "test_sk_EWhGo3D4muvGL47S3e2l",
        },
    };
    (0, axios_1.default)(config)
        .then(function (response) {
        res.json(response.data);
    })
        .catch(function (error) {
        console.log(error);
    });
};
exports.statement = statement;
const expenses = (req, res) => {
    let id = req.params["id"];
    let config = {
        method: "get",
        url: `https://api.withmono.com/accounts/${id}/debits`,
        headers: {
            "mono-sec-key": "test_sk_EWhGo3D4muvGL47S3e2l",
        },
    };
    (0, axios_1.default)(config)
        .then(function (response) {
        res.json(response.data);
    })
        .catch(function (error) {
        console.log(error);
    });
};
exports.expenses = expenses;
const wallets = (req, res) => {
    let id = req.params["id"];
    let config = {
        method: "get",
        url: `https://api.withmono.com/users/stats/wallet`,
        headers: {
            "mono-sec-key": "test_sk_EWhGo3D4muvGL47S3e2l",
        },
    };
    (0, axios_1.default)(config)
        .then(function (response) {
        res.json(response.data);
    })
        .catch(function (error) {
        console.log(error);
    });
};
exports.wallets = wallets;
const shareholder = (req, res) => {
    let config = {
        method: "get",
        url: `https://api.withmono.com/v1/cac/company/6097094`,
        headers: {
            "mono-sec-key": "test_sk_EWhGo3D4muvGL47S3e2l",
        },
    };
    (0, axios_1.default)(config)
        .then(function (response) {
        res.json(response.data);
    })
        .catch(function (error) {
        console.log(error);
    });
};
exports.shareholder = shareholder;
