import { postDataApi, getDataApi, putDataApi, patchDataApi, deleteDataApi } from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";
import { DeleteData, GLOBALTYPES } from "./globalTypes";

export const GROUP_TYPES = {
    CREATE_GROUP: 'CREATE_GROUP',
    UPDATE_GROUP: 'UPDATE_GROUP',
    GET_USER_GROUPS: 'GET_USER_GROUPS',
    GET_GROUP_DETAIL: 'GET_GROUP_DETAIL',
    GET_ALL_GROUPS: 'GET_ALL_GROUPS',
    LOADING_GROUP: 'LOADING_GROUP',
    LOADING_DISCOVER: 'LOADING_DISCOVER',
    GET_DISCOVER_GROUPS: 'GET_DISCOVER_GROUPS',
    GET_JOIN_REQUESTS: 'GET_JOIN_REQUESTS',
    REVIEW_JOIN_REQUEST: 'REVIEW_JOIN_REQUEST',
    REMOVE_MEMBER: 'REMOVE_MEMBER',
}

// export const createGroup = ({ data, token, avatar }) => async (dispatch) => {
//     try {
//         let newImg = null;
//         if (avatar) newImg = await imageUpload([avatar], token);
//         dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

//         const res = await postDataApi('group', {
//             ...data,
//             avatar
//         }, token);

//         dispatch({
//             type: GROUP_TYPES.CREATE_GROUP,
//             payload: {
//                 ...res.data.results,
//                 avatar: avatar ? newImg[0].url : ''
//             }  // Adjust according to your backend response
//         });

//         dispatch({
//             type: GLOBALTYPES.ALERT,
//             payload: { success: res.data.message || "Group created successfully!" }
//         });

//         return res.data.results;
//     } catch (error) {
//         console.error(error);
//         dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response?.data.message || "Something went wrong" } })
//     }
// }

export const createGroup = ({ data, token, avatar }) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

        let avatarData = null;

        // Upload avatar first if provided
        if (avatar) {
            const newImg = await imageUpload([avatar], token);
            if (newImg && newImg.length > 0) {
                avatarData = newImg[0];   // Usually { public_id, url, ... }
            }
        }

        // Prepare data to send to backend
        const payload = {
            ...data,
            avatar: avatarData,
        };

        const res = await postDataApi('group', payload, token);

        // Dispatch success
        dispatch({
            type: GROUP_TYPES.CREATE_GROUP,
            payload: res.data.results || res.data   // Adjust based on your actual response structure
        });

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.message || "Group created successfully!"
            }
        });

        return res.data.results || res.data;

    } catch (error) {
        console.error(error);
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: error.response?.data?.message || "Something went wrong"
            }
        });
        throw error;   // Important: re-throw so modal can catch it
    }
};

// Update / Edit Group
export const updateGroup = ({ groupId, token, data: groupData, avatar, socket }) => async (dispatch) => {
    try {
        let newImg = null;
        if (avatar) {
            newImg = await imageUpload([avatar], token);
        }

        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

        const res = await putDataApi(`group/${groupId}`, {
            ...groupData,
            avatar: avatar ? newImg[0] : groupData?.avatar
        }, token);

        // const newGroup = {
        //     groupId,
        //     data: {
        //         ...groupData,
        //         avatar: avatar ? newImg[0].url : groupData?.avatar

        //     }
        // }

        dispatch({
            type: GROUP_TYPES.UPDATE_GROUP,
            payload: res.data.results
            // payload: newGroup.data
        });

        // socket.emit("group:update", newGroup)

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { success: res.data.message || "Group updated successfully!" }
        });

    } catch (err) {
        console.error(err.response?.data?.message ?? err);
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response?.data?.message || "Failed to update group" }
        });
        throw err;
    } finally {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    }
};

/**
 * Get User's Joined Groups
 * @param {*} param0 
 * @returns 
 */
export const getUserGroups = ({ token, page, searchTerm }) => async (dispatch) => {
    try {
        // dispatch({ type: GROUP_TYPES.LOADING_GROUP, payload: true });

        // const res = await getDataApi(`group/by?page=${page}&limit=${page * 9}`, token);
        let url = searchTerm
            ? `group/by?name=${encodeURIComponent(searchTerm)}&limit=${page * 9}`
            : `group/by?page=${page}&limit=${page * 9}`;

        const res = await getDataApi(url, token);
        const { data: { results } } = res;
        dispatch({
            type: GROUP_TYPES.GET_USER_GROUPS,
            payload: {
                // groups: res.data.results || res.data.groups || res.data,
                groups: results,
                page,
                myGroupsResult: results.length || 0
            }
        });

    } catch (err) {
        console.error(err);
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err?.response?.message || "Something wnet wrong" } });
        throw err;
    } finally {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    }
};

/**
Search / Discover Groups
@param {Object} param0 - Object containing parameters for searching / discovering groups
@param {string} param0.token - Authentication token
@param {string} [param0.searchTerm=''] - Search term condition, default is an empty string
@param {number} param0.page - Current page number
@param {string} param0.tab - Tab or group to search / discover
@returns {Function} - An async function that returns a dispatch function
*/
export const searchOrDiscoverGroups = ({ token, searchTerm = '', page, tab }) => async (dispatch) => {
    try {
        dispatch({ type: GROUP_TYPES.LOADING_DISCOVER, payload: true });

        let url = searchTerm
            // ? `group/discover?name=${encodeURIComponent(searchTerm)}&page=${page}&limit=${page * 9}`
            ? `group/discover?name=${encodeURIComponent(searchTerm)}&limit=${page * 9}`
            : `group/discover?limit=${page * 9}`;

        const res = await getDataApi(url, token);
        const { data: { results } } = res;

        dispatch({
            type: GROUP_TYPES.GET_DISCOVER_GROUPS,
            payload: {
                // groups: res.data.results || res.data.groups || res.data,
                groups: results,
                page,
                result: results.length || 0
            }
        });
    } catch (err) {
        console.error("[ERR_GET_DISCOVER_GROUPS] ", err);
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data?.message } });
    } finally {
        dispatch({ type: GROUP_TYPES.LOADING_DISCOVER, payload: false });
    }
};

/**
 * Search / All Groups
 * @param {Object} param0 - Object containing parameters for searching / discovering groups
 * @param {string} param0.token - Authentication token
 * @param {string} [param0.searchTerm=''] - Search term condition, default is an empty string
 * @param {number} param0.page - Current page number
 * @param {string} param0.tab - Tab or group to search / discover@param {*} param0 
 * @returns {Function} - An async function that returns a dispatch function
 */
export const searchOrAllGroups = ({ token, searchTerm = '', page }) => async (dispatch) => {
    try {
        dispatch({ type: GROUP_TYPES.LOADING_DISCOVER, payload: true });

        let url = searchTerm
            // ? `group/discover?name=${encodeURIComponent(searchTerm)}&page=${page}&limit=${page * 9}`
            ? `group?name=${encodeURIComponent(searchTerm)}&limit=${page * 9}`
            : `group?limit=${page * 9}`;

        const res = await getDataApi(url, token);

        const { data: { results } } = res;

        dispatch({
            type: GROUP_TYPES.GET_ALL_GROUPS,
            payload: {
                groups: results,
                page,
                result: results.length
            }
        });
    } catch (err) {
        console.error("[ERR_GET_GROUPS] ", err);
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data?.message } });
    } finally {
        dispatch({ type: GROUP_TYPES.LOADING_DISCOVER, payload: false });
    }
};
// Get Single Group Detail
export const getGroup = ({ groupDetail, id: groupId, token }) => async (dispatch) => {
    if (groupDetail.every(p => p._id !== groupId)) {
        try {
            const res = await getDataApi(`group/${groupId}`, token);
            dispatch({ type: GROUP_TYPES.GET_GROUP_DETAIL, payload: res.data.results })

        } catch (err) {
            console.error(err);
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: err.response?.data?.message || "Failed to load group" }
            });
        } finally {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {}
            });
        }
    }

};

// Invite Members to Group
export const inviteToGroup = (groupId, userIds) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

        const res = await postDataApi(`group/${groupId}/invite`, { userIds });

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { success: res.data.message || "Invitations sent successfully!" }
        });

    } catch (err) {
        console.error(err);
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response?.data?.message || "Failed to invite members" }
        });
    }
};

// Leave Group
export const leaveGroup = ({ id: groupId, token }) => async (dispatch) => {
    try {
        const res = await postDataApi(`group/${groupId}/leave`, null, token);

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { success: res.data.message || "Left group successfully" }
        });

        // Refresh user groups
        dispatch(getUserGroups({ token, page: 1, limit: 12 }));

    } catch (err) {
        console.error(err);
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response?.data?.message || "Failed to leave group" }
        });
    }
};

// ====================== JOIN GROUP ======================
export const joinGroup = ({ group: groupDetail, auth }) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

        const res = await postDataApi(`group/${groupDetail._id}/join`, {}, auth.token);
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { success: res.data.message || "Joined group successfully!" }
        });

        dispatch({
            type: GROUP_TYPES.GET_GROUP_DETAIL,
            payload: {
                ...groupDetail,
                joinRequests: [...groupDetail.joinRequests, {
                    _id: res.data.results._id,
                    group: groupDetail._id,
                    user: {
                        username: auth.user.username,
                        avatar: auth.user.avatar,
                        _id: auth.user._id
                    },
                    requestedAt: new Date().toISOString(),
                    createdAt: new Date().toISOString(),
                    status: "pending"
                }]
            }
        });

    } catch (error) {
        console.error(error);
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: error.response?.data?.message || "Failed to join group"
            }
        });
        throw error;
    } finally {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    }
};

// ====================== GET JOIN REQUESTS (For Admin/Manager) ======================
export const getJoinRequests = ({ groupId, token }) => async dispatch => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

        const res = await getDataApi(`group/${groupId}/join-requests`, token);

        dispatch({
            type: GROUP_TYPES.GET_JOIN_REQUESTS,
            payload: res.data.results || res.data || []
        });

        return res.data;
    } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response?.message || "Something went wrong" } });
        throw error;
    } finally {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    }
};

// ====================== REVIEW JOIN REQUEST (Approve / Reject) ======================
export const reviewJoinRequest = ({ request, status, group, token }) => async (dispatch) => {
    const { _id: requestId } = request;
    if (!requestId) return;

    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
        const res = await patchDataApi(`group/join-request/${requestId}`, { status }, token);
        const newListRequest = DeleteData(group.joinRequests, requestId);
        if (status === 'approved') {
            dispatch({
                type: GROUP_TYPES.REVIEW_JOIN_REQUEST,
                payload: {
                    ...group,
                    joinRequests: newListRequest,
                    members: [
                        ...group.members,
                        {
                            user: request.user,
                            role: 'member',
                            joinedAt: new Date().toISOString()
                        }
                    ],
                    memberCount: group.memberCount + 1
                }
            });
        }

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.message || `Request ${status} successfully!`
            }
        });

    } catch (error) {
        console.error(error);
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: error.response?.data?.message || "Failed to process request"
            }
        });
        throw error;
    } finally {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    }
};

// Change Member Role (Promote / Demote)
export const changeMemberRole = ({ groupId, userId, newRole, token }) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

        const res = await putDataApi(`group/${groupId}/member/${userId}/role`, { newRole }, token);

        dispatch({
            type: GROUP_TYPES.UPDATE_GROUP,
            payload: res.data.results || res.data
        });

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { success: `Member role updated to ${newRole}` }
        });

        return res.data;
    } catch (error) {
        console.error(error);
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: error.response?.data?.message || "Failed to update role" }
        });
    } finally {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    }
};

// Remove Member
export const removeMember = ({ group: groupDetail, userId, token }) => async (dispatch) => {
    const { _id: groupId } = groupDetail;
    if (!groupId) return;
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

        const res = await deleteDataApi(`group/${groupId}/members/${userId}`, token);
        // console.log({ groupId, userId, groupDetail })
        const newList = groupDetail.members.filter(m => m.user._id !== userId)
        dispatch({
            type: GROUP_TYPES.REMOVE_MEMBER,
            payload: {
                ...groupDetail,
                members: newList
            }
        });

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { success: res.data?.message || "success" }
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: error.response?.data?.message || "Failed to remove member" }
        });
        throw error;
    } finally {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    }
};

export const promoteToAdmin = () => async (dispatch) => {

}