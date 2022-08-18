"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const authRouter_js_1 = __importDefault(require("./routes/authRouter.js"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    credentials: true,
}));
try {
    mongoose_1.default.connect("mongodb://localhost:27017/mono");
    console.log("Connected");
}
catch (err) {
    console.log(err);
    process.exit(1);
}
app.post("/code/:auth", (req, res) => {
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
});
app.post("/code/transactions/:_id", (req, res) => {
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
});
app.post("/code/unlink/:id", (req, res) => {
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
});
app.get("/code/statement/:id", (req, res) => {
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
});
app.get("/code/expenses/:id", (req, res) => {
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
});
app.get("/code/wallets/:id", (req, res) => {
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
});
app.get("/code/shareholder", (req, res) => {
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
});
app.get("/", (req, res) => res.send("This is the begining of the mono backend"));
app.use("/auth", authRouter_js_1.default);
app.listen(3001, () => console.log("Now listening"));
