"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const offers_service_1 = require("./offers.service");
const create_offer_dto_1 = require("./dto/create-offer.dto");
const update_offer_dto_1 = require("./dto/update-offer.dto");
let OffersController = class OffersController {
    offersService;
    constructor(offersService) {
        this.offersService = offersService;
    }
    create(createOfferDto) {
        return this.offersService.create(createOfferDto);
    }
    findAll() {
        return this.offersService.findAll();
    }
    findActive() {
        return this.offersService.findActive();
    }
    findOne(id) {
        return this.offersService.findOne(id);
    }
    update(id, updateOfferDto) {
        return this.offersService.update(id, updateOfferDto);
    }
    remove(id) {
        return this.offersService.remove(id);
    }
};
exports.OffersController = OffersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new offer',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Offer created successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid offer data',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_offer_dto_1.CreateOfferDto]),
    __metadata("design:returntype", void 0)
], OffersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all offers',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'All offers returned successfully',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OffersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get currently active offers',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Active offers returned successfully',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OffersController.prototype, "findActive", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get an offer by ID',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        example: '66b123456789abcdef123456',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Offer found',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Offer not found',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OffersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update an offer',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        example: '66b123456789abcdef123456',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Offer updated successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Offer not found',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_offer_dto_1.UpdateOfferDto]),
    __metadata("design:returntype", void 0)
], OffersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete an offer',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        example: '66b123456789abcdef123456',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Offer deleted successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Offer not found',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OffersController.prototype, "remove", null);
exports.OffersController = OffersController = __decorate([
    (0, swagger_1.ApiTags)('Offers'),
    (0, common_1.Controller)('offers'),
    __metadata("design:paramtypes", [offers_service_1.OffersService])
], OffersController);
//# sourceMappingURL=offers.controller.js.map