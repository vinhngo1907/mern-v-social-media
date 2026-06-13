const express = require('express');
const router = express.Router();
const { userAuth } = require('../middleware');
const { GroupController } = require("../controllers");
const groupCtrl = new GroupController();

/**
 * @route GET api/group
 * @desc Get group
 * @access Private
 */
router.post("/", userAuth, groupCtrl.CreateGroup);

/**
 * @route GET api/group
 * @desc Get groups by user
 * @access Private
 */
router.get("/by", userAuth, groupCtrl.GetUserGroups);

/**
 * @route GET api/group
 * @desc Get all groups
 * @access Private
 */
router.get("/", userAuth, groupCtrl.GetAllGroups);

/**
 * @route GET api/group
 * @desc Get all groups
 * @access Private
 */
router.get("/discover", userAuth, groupCtrl.DiscoverGroups);

/**
 * @route GET api/group/:id
 * @desc Get group by id
 * @access Private
 */
router.get("/:id", userAuth, groupCtrl.GetGroupById);

/**
 * @route PUT api/group/:id
 * @desc Update a group
 * @access Private
 */
router.put("/:id", userAuth, groupCtrl.UpdateGroup);

// router.post("/:id/invite", userAuth, groupCtrl.GenerateInvite);
// router.post("/join/:inviteCode", userAuth, groupCtrl.JoinViaInvite);
// router.post("/:id/members/:userId/role", userAuth, groupCtrl.ChangeMemberRole);
// router.delete("/:id/members/:userId", userAuth, groupCtrl.RemoveMember);

router.post('/:id/join', userAuth, groupCtrl.JoinGroup);
router.get('/:id/join-requests', userAuth, groupCtrl.GetJoinRequests);
router.put('/join-request/:requestId', userAuth, groupCtrl.ReviewJoinRequest);

module.exports = router;