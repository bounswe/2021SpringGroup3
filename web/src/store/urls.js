export const BASE_URL = 'https://api.cmpegroupthree.store/';

export const LOGIN_ENDPOINT = `${BASE_URL}auth/login`;
export const LOGOUT_ENDPOINT = `${BASE_URL}auth/logout`;
export const REGISTER_ENDPOINT = `${BASE_URL}auth/register`;

export const GET_HOME_PAGE_POSTS_ENDPOINT = `${BASE_URL}posts/homepage`;
export const GET_RECOMMENDED_USERS_ENDPOINT = `${BASE_URL}profile/recommend`;
export const GET_RECOMMENDED_COMMUNITIES_ENDPOINT = `${BASE_URL}communities/recommend`;
export const SEARCH_COMMUNITIES_ENDPOINT = `${BASE_URL}communities/search`;
export const SEARCH_USERS_ENDPOINT = `${BASE_URL}profile/search`;
export const CREATE_COMMUNITY_ENDPOINT = `${BASE_URL}communities`;
export const GET_COMMUNITIES_ENDPOINT = `${BASE_URL}communities`;
export const DELETE_COMMUNITY_ENDPOINT = `${BASE_URL}communities`;
export const GET_COMMUNITY_PAGE_ENDPOINT = `${BASE_URL}communities/detail`;
export const LEAVE_COMMUNITY_ENDPOINT = `${BASE_URL}communities/leave`;
export const JOIN_COMMUNITY_ENDPOINT = `${BASE_URL}communities/join`;
export const APPROVE_COMMUNITY_ENDPOINT = `${BASE_URL}communities/join/approve`;
export const REJECT_COMMUNITY_ENDPOINT = `${BASE_URL}communities/join/reject`;
export const JOIN_COMMUNITY_MODERATOR_ENDPOINT = `${BASE_URL}communities/join/moderators`;
export const APPROVE_COMMUNITY_MODERATOR_ENDPOINT = `${BASE_URL}communities/join/moderators/approve`;
export const REJECT_COMMUNITY_MODERATOR_ENDPOINT = `${BASE_URL}communities/join/moderators/reject`;
export const KICK_COMMUNITY_ENDPOINT = `${BASE_URL}communities/kick`;
export const CREATE_POST_ENDPOINT = `${BASE_URL}posts`;
export const GET_POSTS_ENDPOINT = `${BASE_URL}posts`;
export const SEARCH_POSTS_ENDPOINT = `${BASE_URL}posts/search`;
export const ADVANCED_SEARCH_ENDPOINT = `${BASE_URL}posts/advancedSearch`
export const GET_POST_PAGE_ENDPOINT = `${BASE_URL}posts/detail`;

export const CREATE_POSTTYPE_ENDPOINT = `${BASE_URL}post-types`;
export const GET_POSTTYPES_ENDPOINT = `${BASE_URL}post-types`;
export const GET_POSTTYPE_DETAIL_ENDPOINT = `${BASE_URL}post-types/detail`;

export const GET_PROFILE_ENDPOINT = `${BASE_URL}profile`;
export const GET_PROFILE_OTHER_ENDPOINT = `${BASE_URL}profile/other`;
export const GET_PROFILE_SETTINGS_ENDPOINT = `${BASE_URL}profile/settings`;
export const POST_PROFILE_SETTINGS_ENDPOINT = `${BASE_URL}profile/settings`;
export const NOTIFICATION_ENDPOINT = `${BASE_URL}profile/notification`;

export const LIKE_POST_ENDPOINT = `${BASE_URL}posts/like`;
export const UNLIKE_POST_ENDPOINT = `${BASE_URL}posts/unlike`;
export const FOLLOW_ENDPOINT = `${BASE_URL}profile/follow`;
export const UNFOLLOW_ENDPOINT = `${BASE_URL}profile/unfollow`;
export const ACCEPT_FOLLOWER_ENDPOINT = `${BASE_URL}profile/approve`;
export const REJECT_FOLLOWER_ENDPOINT = `${BASE_URL}profile/reject`;
export const POST_COMMENT_ENDPOINT = `${BASE_URL}posts/comment`;
export const SEARCH_WIKIDATA_ENDPOINT = `${BASE_URL}wikidata`;
