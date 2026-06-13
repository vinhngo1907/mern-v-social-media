import { postDataApi, getDataApi, deleteDataApi, putDataApi } from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";
import { GLOBALTYPES } from "./globalTypes";

export const GROUP_TYPES = {
    CREATE_GROUP: 'CREATE_GROUP',
    UPDATE_GROUP: 'UPDATE_GROUP',
    GET_USER_GROUPS: 'GET_USER_GROUPS',
    GET_GROUP_DETAIL: 'GET_GROUP_DETAIL',
    GET_ALL_GROUPS: 'GET_ALL_GROUPS',
    LOADING_GROUP: 'LOADING_GROUP',
    LOADING_DISCOVER: 'LOADING_DISCOVER',
    GET_DISCOVER_GROUPS: 'GET_DISCOVER_GROUPS',
}

export const createGroup = ({ data, token, avatar }) => async (dispatch) => {
    try {
        let newImg = null;
        if (avatar) newImg = await imageUpload([avatar], token);
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

        const res = await postDataApi('group', {
            ...data,
            avatar
        }, token);

        dispatch({
            type: GROUP_TYPES.CREATE_GROUP,
            payload: {
                ...res.data.results,
                avatar: avatar ? newImg[0].url : ''
            }  // Adjust according to your backend response
        });

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { success: res.data.message || "Group created successfully!" }
        });

        return res.data.results;
    } catch (error) {
        console.error(error);
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response?.data.message || "Something went wrong" } })
    }
}

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

        const newGroup = {
            groupId,
            data: {
                ...groupData,
                avatar: avatar ? newImg[0].url : groupData?.avatar

            }
        }

        dispatch({
            type: GROUP_TYPES.UPDATE_GROUP,
            // payload: res.data.results
            payload: newGroup.data
        });

        socket.emit("group:update", newGroup)

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
    } finally {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    }
};

export const promoteToAdmin = () => async (dispatch) => {

}

export const removeMember = ({ ids, auth, socket }) => {

}

// Get User's Joined Groups
export const getUserGroups = ({ token, page, limit }) => async (dispatch) => {
    try {
        dispatch({ type: GROUP_TYPES.LOADING_GROUP, payload: true });

        const res = await getDataApi(`group/by?page=${page}&limit=${limit}`, token);

        dispatch({
            type: GROUP_TYPES.GET_USER_GROUPS,
            payload: {
                groups: res.data.results || res.data.groups || res.data,
                page,
                result: res.data.result || res.data.length || 0
            }
        });

    } catch (err) {
        console.error(err);
    } finally {
        dispatch({ type: GROUP_TYPES.LOADING_GROUP, payload: false });
    }
};

export const searchGroups = (query) => async (dispatch) => {
    try {
        const res = await getDataApi(`group/search?name=${query}`);
        return res.data.results || res.data.groups;
    } catch (err) {
        console.error(err);
        return [];
    }
};

// Search / Discover Groups
export const searchOrDiscoverGroups = ({ token, searchTerm = '', page, limit }) => async (dispatch) => {
    try {
        dispatch({ type: GROUP_TYPES.LOADING_DISCOVER, payload: true });

        let url = searchTerm
            ? `group/discover?name=${encodeURIComponent(searchTerm)}&page=${page}&limit=${limit}`
            : `group/discover?page=${page}&limit=${limit}`;

        const res = await getDataApi(url, token);   // No token needed for discover

        dispatch({
            type: GROUP_TYPES.GET_DISCOVER_GROUPS,
            payload: {
                groups: res.data.results || res.data.groups || res.data,
                page,
                result: res.data.result || res.data.length || 0
            }
        });
    } catch (err) {
        console.error(err);
    } finally {
        dispatch({ type: GROUP_TYPES.LOADING_DISCOVER, payload: false });
    }
};

// Get Single Group Detail
export const getGroupById = ({ id: groupId, token }) => async (dispatch) => {
    try {
        dispatch({ type: GROUP_TYPES.LOADING_GROUP, payload: true });

        const res = await getDataApi(`group/${groupId}`, token);

        dispatch({
            type: GROUP_TYPES.GET_GROUP_DETAIL,
            payload: res.data.group || res.data.results
        });

        return res.data.group || res.data.results;

    } catch (err) {
        console.error(err);
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response?.data?.message || "Failed to load group" }
        });
    } finally {
        dispatch({ type: GROUP_TYPES.LOADING_GROUP, payload: false });
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
export const leaveGroup = (groupId) => async (dispatch) => {
    try {
        const res = await deleteDataApi(`group/${groupId}/leave`);

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { success: res.data.message || "Left group successfully" }
        });

        // Refresh user groups
        dispatch(getUserGroups());

    } catch (err) {
        console.error(err);
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response?.data?.message || "Failed to leave group" }
        });
    }
};

// ====================== JOIN GROUP ======================
export const joinGroup = ({ id: groupId, token }) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

        const res = await postDataApi(`group/${groupId}/join`, {}, token);

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { success: res.data.message || "Joined group successfully!" }
        });

        // Refresh my groups list
        dispatch(getUserGroups({ token, page: 1, limit: 12 }));

        return res.data;
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