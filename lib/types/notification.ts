export interface NotificationMessage {
  notificationId: string;
  groupId: number;
  senderId: number;
  targetId: number;
  groupName: string;
  senderNickName: string;
  targetNickName: string;
  action: string;
  timestamp: string;
}
