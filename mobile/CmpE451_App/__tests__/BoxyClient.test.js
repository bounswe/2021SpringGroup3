import * as client from '../src/services/BoxyClient';

test('Test Get Search Community URL', async () => {
  const url = client.getSearchCommunityUrl('C');
  expect(url).toBe(
    'https://api.cmpegroupthree.store/communities/search?query=C',
  );
});

test('Test Get Search User URL', async () => {
  const url = client.getSearchUserUrl('U');
  expect(url).toBe('https://api.cmpegroupthree.store/profile/search?query=U');
});

test('Test Get Recommended Communities URL', async () => {
  const url = client.getRecommendedCommunitiesUrl();
  expect(url).toBe('https://api.cmpegroupthree.store/communities/recommend');
});

test('Test Get Recommended Users URL', async () => {
  const url = client.getRecommendedUsersUrl();
  expect(url).toBe('https://api.cmpegroupthree.store/profile/recommend');
});

test('Test Get Post Type URL', async () => {
  const url = client.getPostTypesUrl('id');
  expect(url).toBe(
    'https://api.cmpegroupthree.store/post-types?communityId=id',
  );
});

test('Test Get Advanced Search Posts URL', async () => {
  const url = client.getAdvancedSearchPostsUrl('likeCount');
  expect(url).toBe(
    'https://api.cmpegroupthree.store/posts/advancedSearch?sortBy=likeCount',
  );
});

test('Test Get Search Posts URL', async () => {
  const url = client.getSearchPostsUrl('communityId', 'tag', 'likeCount');
  expect(url).toBe(
    'https://api.cmpegroupthree.store/posts/search?communityId=communityId&sortBy=likeCount&tag=tag',
  );
});

test('Test Get Change Password URL', async () => {
  const url = client.getChangePasswordUrl();
  expect(url).toBe('https://api.cmpegroupthree.store/auth/changePassword');
});
