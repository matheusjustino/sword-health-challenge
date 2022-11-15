export class NotificationsQueuePayloadDTO {
	public user: {
		id: string;
	};
	public task: {
		id: string;
		performedDate: Date;
	};
}
