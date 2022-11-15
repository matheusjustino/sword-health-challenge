// ENTITIES
import { Task } from '../../database/entities/task.entity';

export interface ManagerTasksServiceInterface {
	findAll(): Promise<Task[]>;
	updateTask(taskId: string, data): Promise<void>;
	deleteTask(taskId: string): Promise<void>;
}
