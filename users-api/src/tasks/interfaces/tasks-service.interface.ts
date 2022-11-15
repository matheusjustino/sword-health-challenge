// ENTITIES
import { Task } from '../../database/entities/task.entity';

export interface TasksServiceInterface {
	createTask(userId: string, data): Promise<void>;
	findTasks(userId: string): Promise<Task[]>;
	updateTask(userId: string, taskId: string, data): Promise<void>;
}
