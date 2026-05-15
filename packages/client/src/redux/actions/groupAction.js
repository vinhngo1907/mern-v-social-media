import { postDataApi, getDataApi, patchDataApi, deleteDataApi } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";
export const GROUP_TYPES = {
    CREATE_GROUP: 'CREATE_GROUP',
    UPDATE_GROUP: 'UPDATE_GROUP',
    GET_USER_GROUPS: 'GET_USER_GROUPS',
    GET_GROUP_DETAIL: 'GET_GROUP_DETAIL',
    GET_ALL_GROUPS: 'GET_ALL_GROUPS',
    LOADING_GROUP: 'LOADING_GROUP',
}

export const createGroup = ({ data, auth }) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

        const res = await postDataApi('group', data, auth.token);

        dispatch({
            type: GROUP_TYPES.CREATE_GROUP,
            payload: res.data.results  // Adjust according to your backend response
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
export const updateGroup = (groupId, data) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

        const res = await patchDataApi(`group/${groupId}`, data);

        dispatch({
            type: GROUP_TYPES.UPDATE_GROUP,
            payload: res.data.group || res.data.results
        });

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { success: res.data.message || "Group updated successfully!" }
        });

    } catch (err) {
        console.error(err.response?.data);
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response?.data?.message || "Failed to update group" }
        });
    }
};

// Get User's Joined Groups
export const getUserGroups = () => async (dispatch) => {
    try {
        dispatch({ type: GROUP_TYPES.LOADING_GROUP, payload: true });

        const res = await getDataApi('group/by');

        dispatch({
            type: GROUP_TYPES.GET_USER_GROUPS,
            payload: res.data.results || res.data.groups
        });

    } catch (err) {
        console.error(err);
    } finally {
        dispatch({ type: GROUP_TYPES.LOADING_GROUP, payload: false });
    }
};

// Get Single Group Detail
export const getGroupById = (groupId) => async (dispatch) => {
    try {
        dispatch({ type: GROUP_TYPES.LOADING_GROUP, payload: true });

        const res = await getDataApi(`group/${groupId}`);

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

export const searchGroups = (query) => async (dispatch) => {
    try {
        const res = await getDataApi(`group/search?name=${query}`);
        return res.data.results || res.data.groups;
    } catch (err) {
        console.error(err);
        return [];
    }
};