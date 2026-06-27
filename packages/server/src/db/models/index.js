const { policyModel, resourceModel } = require("./policy.model");
const { groupInviteModel, groupJoinRequestModel } = require("./groupInvite");

module.exports = {
    userModel: require("./user.model"),
    postModel: require("./post.model"),
    notifyModel: require("./notify.model"),
    commentModel: require("./comment.model"),
    statisticModel: require("./statistic.model"),
    socialModel: require("./social.model"),
    conversationModel: require("./conversation.model"),
    messageModel: require("./message.model"),
    groupModel: require("./group.model"),
    groupInviteModel, groupJoinRequestModel,
    videoModel: require("./video.model"),
    roleModel: require("./role.model"),
    capacitiesModel: require("./capacity.model"),
    settingModel: require("./setting.model"),
    policyModel, resourceModel
}