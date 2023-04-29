export interface AddFriendInterface {
  uid: string;
  recipient: string;
}

export interface GetFriendRequestsInterface {
  uid: string;
}

export interface GetFriendsInterface {
  uid: string;
}

export interface AcceptFriendRequestInterface {
  uid: string;
  id: number;
}

export interface RejectFriendRequestInterface {
  uid: string;
  id: number;
}
