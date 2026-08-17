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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferSchema = exports.Offer = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
let Offer = class Offer {
    smallTitle;
    heading;
    buttonText;
    buttonLink;
    bannerImage;
    backgroundColor;
    buttonColor;
    textColor;
    isActive;
    sortOrder;
    startDate;
    endDate;
};
exports.Offer = Offer;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'END OF SEASON',
        description: 'Small text displayed above the main offer heading',
    }),
    (0, mongoose_1.Prop)({
        required: true,
        trim: true,
    }),
    __metadata("design:type", String)
], Offer.prototype, "smallTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Up to 40% off outerwear',
        description: 'Main offer heading',
    }),
    (0, mongoose_1.Prop)({
        required: true,
        trim: true,
    }),
    __metadata("design:type", String)
], Offer.prototype, "heading", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'SHOP THE SALE',
        description: 'CTA button text',
    }),
    (0, mongoose_1.Prop)({
        required: true,
        trim: true,
    }),
    __metadata("design:type", String)
], Offer.prototype, "buttonText", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '/sale',
        description: 'Route or URL for the CTA button',
    }),
    (0, mongoose_1.Prop)({
        required: true,
        trim: true,
    }),
    __metadata("design:type", String)
], Offer.prototype, "buttonLink", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'https://example.com/uploads/offer-banner.jpg',
        description: 'Optional offer/banner image URL',
        nullable: true,
    }),
    (0, mongoose_1.Prop)({
        default: null,
    }),
    __metadata("design:type", String)
], Offer.prototype, "bannerImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '#1B1B1B',
        description: 'Offer banner background color',
        default: '#1B1B1B',
    }),
    (0, mongoose_1.Prop)({
        required: true,
        default: '#1B1B1B',
    }),
    __metadata("design:type", String)
], Offer.prototype, "backgroundColor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '#C45127',
        description: 'CTA button background color',
        default: '#C45127',
    }),
    (0, mongoose_1.Prop)({
        required: true,
        default: '#C45127',
    }),
    __metadata("design:type", String)
], Offer.prototype, "buttonColor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '#FFFFFF',
        description: 'Offer banner text color',
        default: '#FFFFFF',
    }),
    (0, mongoose_1.Prop)({
        required: true,
        default: '#FFFFFF',
    }),
    __metadata("design:type", String)
], Offer.prototype, "textColor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Whether this offer is active',
        default: true,
    }),
    (0, mongoose_1.Prop)({
        required: true,
        default: true,
    }),
    __metadata("design:type", Boolean)
], Offer.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Display order of the offer',
        default: 1,
    }),
    (0, mongoose_1.Prop)({
        required: true,
        default: 1,
    }),
    __metadata("design:type", Number)
], Offer.prototype, "sortOrder", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2026-08-01T00:00:00.000Z',
        description: 'Offer start date',
    }),
    (0, mongoose_1.Prop)({
        default: null,
    }),
    __metadata("design:type", Date)
], Offer.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2026-08-31T23:59:59.000Z',
        description: 'Offer expiry date',
    }),
    (0, mongoose_1.Prop)({
        default: null,
    }),
    __metadata("design:type", Date)
], Offer.prototype, "endDate", void 0);
exports.Offer = Offer = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        collection: 'offers',
    })
], Offer);
exports.OfferSchema = mongoose_1.SchemaFactory.createForClass(Offer);
//# sourceMappingURL=offer.entity.js.map