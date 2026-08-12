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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const notification_schema_1 = require("./schema/notification.schema");
const user_schema_1 = require("../user/schema/user.schema");
let NotificationService = class NotificationService {
    notificationModel;
    userModel;
    constructor(notificationModel, userModel) {
        this.notificationModel = notificationModel;
        this.userModel = userModel;
    }
    async create(dto) {
        return this.notificationModel.create({
            ...dto,
            userId: new mongoose_2.Types.ObjectId(dto.userId),
        });
    }
    async findAllForUser(userId) {
        return this.notificationModel
            .find({ userId: new mongoose_2.Types.ObjectId(userId), status: 'active' })
            .sort({ createdAt: -1 })
            .lean();
    }
    async countUnread(userId) {
        const count = await this.notificationModel.countDocuments({
            userId: new mongoose_2.Types.ObjectId(userId),
            status: 'active',
            isRead: false,
        });
        return { count };
    }
    async markAsRead(userId, id) {
        return this.notificationModel.findOneAndUpdate({ _id: id, userId: new mongoose_2.Types.ObjectId(userId) }, { isRead: true }, { new: true });
    }
    async remove(userId, id) {
        const notification = await this.notificationModel.findOneAndUpdate({ _id: id, userId: new mongoose_2.Types.ObjectId(userId) }, { status: 'deleted' }, { new: true });
        return notification;
    }
    async notifyAllAdmins(title, body, type, data = {}) {
        console.log('🔔 notifyAllAdmins() CALLED with title:', title);
        const admins = await this.userModel
            .find({ role: 'Admin' })
            .select('_id')
            .lean();
        console.log('🔔 Admins found:', admins.length, admins);
        if (!admins.length) {
            console.log('⚠️ No admins found — skipping notification creation');
            return;
        }
        const result = await this.notificationModel.insertMany(admins.map((admin) => ({
            userId: admin._id,
            title,
            body,
            type,
            data,
            isRead: false,
            status: 'active',
        })));
        console.log('✅ Admin notifications created:', result.length);
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(notification_schema_1.Notification.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], NotificationService);
//# sourceMappingURL=notification.service.js.map