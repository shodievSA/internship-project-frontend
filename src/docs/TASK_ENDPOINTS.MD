# Task Endpoints Documentation

This document describes the API endpoints for managing tasks within a project. It covers creating, updating, deleting, and changing the status of tasks, including permissions, request/response formats, and error cases.

---

## 1. Create Task

**Endpoint:**
```
POST /api/v1/projects/:projectId/tasks
```

**Description:**
Creates a new task in the specified project. Only users with the `assignTasks` permission can create tasks.

**Request Body:**
```json
{
  "task": {
    "title": "string",           // required
    "description": "string",     // required
    "priority": "string",        // e.g., 'low', 'medium', 'high'
    "deadline": "YYYY-MM-DDTHH:mm:ss.sssZ", // ISO date string, must be in the future
    "assignedTo": number          // ProjectMember ID to assign the task to
  }
}
```

**Response:**
- `201 Created` with the created task object
- `403 Forbidden` if the user lacks permission
- `400 Bad Request` for invalid fields or past deadline

**Response Example:**
```json
{
  "id": 1,
  "title": "Task title",
  "description": "Task description",
  "priority": "high",
  "deadline": "2024-07-01T12:00:00.000Z",
  "status": "ongoing",
  "createdAt": "2024-06-01T10:00:00.000Z",
  "assignedBy": { "id": 2, "name": "Alice", "avatarUrl": null },
  "assignedTo": { "id": 3, "name": "Bob", "avatarUrl": null },
  "history": [ ... ]
}
```

**Errors:**
- `400` Invalid fields, missing required fields, or deadline in the past
- `403` Permission denied
- `500` Internal server error

---

## 2. Change Task Status

**Endpoint:**
```
PATCH /api/v1/projects/:projectId/tasks/:taskId/status
```

**Description:**
Change the status of a task. Allowed statuses: `under review`, `rejected`, `closed`.

**Request Body:**
```json
{
  "updatedTaskStatus": "under review" | "rejected" | "closed",
  "comment": "string" // Optional comment for the status change
}
```

**Response:**
- `200 OK` with the updated task object
- `400 Bad Request` if required fields are missing

**Response Example:**
```json
{
  "message": "Task status changed successfully",
  "updatedTask": { ...task object... }
}
```

**Errors:**
- `400` Missing taskId or updatedTaskStatus
- `404` Task not found
- `500` Internal server error

---

## 3. Update Task

**Endpoint:**
```
PATCH /api/v1/projects/:projectId/tasks/:taskId
```

**Description:**
Update properties of a task. Only users with the `editTasks` permission can update tasks. Only certain fields can be updated (not status, projectId, or assignedBy).

**Request Body:**
```json
{
  "updatedTaskProps": {
    "title": "string",         // optional
    "description": "string",   // optional
    "priority": "string",      // optional
    "deadline": "YYYY-MM-DDTHH:mm:ss.sssZ", // optional, must be in the future
    "assignedTo": number        // optional, ProjectMember ID
  }
}
```

**Response:**
- `200 OK` with the updated task object
- `403 Forbidden` if the user lacks permission
- `400 Bad Request` for invalid fields or forbidden changes

**Response Example:**
```json
{
  "updatedTask": { ...task object... }
}
```

**Errors:**
- `400` Invalid fields, forbidden changes (status, projectId, assignedBy)
- `403` Permission denied
- `404` Task not found
- `500` Internal server error

---

## 4. Delete Task

**Endpoint:**
```
DELETE /api/v1/projects/:projectId/tasks/:taskId
```

**Description:**
Delete a task from the project. Only the user who assigned the task (assignedBy) can delete it, and only if they have the `deleteTasks` permission.

**Response:**
- `204 No Content` on success
- `403 Forbidden` if the user lacks permission
- `404 Not Found` if the task does not exist or user is not the assigner

**Errors:**
- `403` No permission
- `404` Task not found or not assigner
- `500` Internal server error

---

## Permissions
- `assignTasks`: Required to create tasks
- `editTasks`: Required to update tasks
- `deleteTasks`: Required to delete tasks

---

## Route Middleware: getMemberPermissions

**Applied to:**
```
/:projectId/tasks
```

**Usage Example:**
```js
router.use('/:projectId/tasks', getMemberPermissions, taskRouter);
```

**Description:**
The `getMemberPermissions` middleware is applied to all task-related endpoints under a specific project. It checks the permissions of the authenticated user for the given project and attaches them to the request object as `req.memberPermissions`.

**Effect:**
- All task endpoints (create, update, delete, change status) require the user to have the appropriate project permissions (e.g., `assignTasks`, `editTasks`, `deleteTasks`).
- If the user lacks the required permission for an action, the endpoint will return a `403 Forbidden` error.

**Permissions Checked:**
- `assignTasks` (for creating tasks)
- `editTasks` (for updating tasks)
- `deleteTasks` (for deleting tasks)

**Error Handling:**
- If the user is not a member of the project or lacks the required permission, the request will be denied with a `403 Forbidden` response.

---

## General Error Responses
- `400 Bad Request`: Invalid or missing input
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource does not exist
- `500 Internal Server Error`: Unexpected error

---

## See Also
- [Project API Documentation](./TASK_API_DOC.MD) 