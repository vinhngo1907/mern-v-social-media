exports.GetFacebookAccessToken = async (shortLivedToken) => {
    const ENDPOINT = `${FACEBOOK_API_URL}oauth/access_token?grant_type=fb_exchange_token&client_id=${FACEBOOK_CLIENT_ID}&client_secret=${FACEBOOK_CLIENT_SECRET}&fb_exchange_token=${shortLivedToken}`;
}

exports.FetchFacebookImpressions = async (FACEBOOK_API_URL, FACEBOOK_PAGE_ID, longLivedFacebookToken) => {

}