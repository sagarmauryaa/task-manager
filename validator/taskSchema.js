const { z } = require('zod');

const completedSchema = z.boolean({
    message: 'Completed must be a boolean value (true or false)',
});

const priorityEnum = z.enum(['low', 'medium', 'high'], {
    message: "Priority must be 'low', 'medium' or 'high'"
});

const taskBaseSchema = {
    title: z
        .string()
        .trim()
        .min(1, 'Title is required'),
    description: z
        .string()
        .trim()
        .min(1, 'Description is required'),
    priority: priorityEnum.optional(),
    completed: completedSchema,
};

const prioritySchema = priorityEnum;

const taskQueryBaseSchema = {
    completed: z.enum(['true', 'false'], {
        message: "completed must be 'true' or 'false'"
    }).optional().transform((val) => (val === undefined ? undefined : val === 'true')),
    search: z.string({
        required_error: "search must be a string"
    }).optional().transform((val) => val?.toLowerCase()),
    priority: prioritySchema,
    sort: z.enum(['createdDate', 'updatedDate'], {
        message: "sort must be either 'createdDate' or 'updatedDate'"
    })
        .default('createdDate')
        .optional(),

    order: z.enum(['asc', 'desc'], {
        message: "order must be 'asc' or 'desc'"
    })
        .default('asc')
        .optional()
        .transform((val) => val?.toLowerCase())
}

const taskQueryFilterSchema = z.object(taskQueryBaseSchema).partial().strict();

const createTaskSchema = z
    .object({
        ...taskBaseSchema,
        priority: priorityEnum.optional().default('low'),
        completed: completedSchema.optional().default(false),
    })
    .strict();

const updateTaskSchema = z
    .object(taskBaseSchema)
    .partial()
    .strict();

const taskIdSchema = z
    .string()
    .regex(/^\d+$/, 'Task ID must be a valid number')
    .transform((val) => Number(val))
    .refine((val) => val > 0, 'Task ID must be a positive number');

module.exports = {
    taskQueryFilterSchema,
    createTaskSchema,
    updateTaskSchema,
    taskIdSchema,
    prioritySchema,
};
