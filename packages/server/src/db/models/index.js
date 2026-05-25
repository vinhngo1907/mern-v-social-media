const { policyModel, resourceModel } = require("./policy.model");

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
    groupInvateModel: require("./groupInvite"),
    videoModel: require("./video.model"),
    roleModel: require("./role.model"),
    capacitiesModel: require("./capacity.model"),
    settingModel: require("./setting.model"),
    policyModel, resourceModel
}