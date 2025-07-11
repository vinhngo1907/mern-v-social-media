const express = require('express');
const router = express.Router();
const { userAuth } = require('../middleware');
const { ConversationController } = require("../controllers");
const conversationCtrl = new ConversationController();

/**
 * @route GET api/conversation
 * @desc Get conversation
 * @access Private
 */
router.get("/", userAuth, conversationCtrl.GetConversation);

/**
 * @route GET api/conversation
 * @desc Get conversation
 * @access Private
 */
router.delete("/:id", userAuth, conversationCtrl.DeleteConversation);

/** 
 * @route POST api/conversation/:id
 * @desc Create group chat by id group
 * @access Private
*/
router.post("/:id", userAuth, conversationCtrl.CreateGroup);

module.exports = router;