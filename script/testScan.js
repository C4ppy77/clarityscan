"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// testScan.ts
var imageUtils_1 = require("../lib/imageUtils"); // Adjust the path if needed
var vision_1 = require("../lib/vision"); // Adjust the path if needed
require("dotenv/config"); // If you are using a .env file for your API key
function runScanTest() {
    return __awaiter(this, void 0, void 0, function () {
        var testImageUrl, base64Image, analysisResult, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testImageUrl = 'http://kickilida.weebly.com/uploads/1/2/4/0/124031697/900178804.jpg';
                    if (!testImageUrl) {
                        console.error("The testImageUrl variable is empty. Please provide a valid image URL.");
                        return [2 /*return*/];
                    }
                    if (!process.env.GEMINI_API_KEY) {
                        console.error("GEMINI_API_KEY environment variable is not set. Please set it before running the test.");
                        return [2 /*return*/];
                    }
                    console.log("Starting scan test with image from: ".concat(testImageUrl));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    // Step 1: Fetch the image from the URL and convert to Base64
                    console.log("Fetching image and converting to Base64...");
                    return [4 /*yield*/, (0, imageUtils_1.fetchBase64Image)(testImageUrl)];
                case 2:
                    base64Image = _a.sent();
                    console.log("Image successfully fetched and converted.");
                    // console.log("Base64 data (first 100 chars):", base64Image.substring(0, 100) + "..."); // Optional: log part of base64
                    // Step 2: Analyze the Base64 image using the Vision API function
                    console.log("Sending image to Vision API for analysis...");
                    return [4 /*yield*/, (0, vision_1.analyseLetterImage)(base64Image)];
                case 3:
                    analysisResult = _a.sent();
                    console.log("\n--- Analysis Result ---");
                    console.log(analysisResult);
                    console.log("-----------------------");
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error("\nAn error occurred during the scan test:");
                    console.error(error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
runScanTest();
