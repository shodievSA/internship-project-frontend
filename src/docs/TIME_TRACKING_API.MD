# Time Tracking API Documentation

## Base URL

All endpoints are prefixed with:  
`/api/v1/projects/timer`

---

### 1. Start Timer

**POST** `/api/v1/projects/timer/start`

**Request Body:**
```json
{
  "taskId": 123,         // Required - ID of the task to track time for
  "note": "string"       // Optional - Note for this time entry
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "userId": 42,
  "taskId": 123,
  "startTime": "2024-06-01T09:00:00.000Z",
  "endTime": null,
  "duration": null,
  "note": "string",
  "createdAt": "2024-06-01T09:00:00.000Z",
  "updatedAt": "2024-06-01T09:00:00.000Z"
}
```

**Errors:**
- 409 Conflict: Timer already running for this user.

---

### 2. Stop Timer

**POST** `/api/v1/projects/timer/stop`

**Request Body:**
```json
{
  "note": "string"   // Optional - Note to update for this time entry
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "userId": 42,
  "taskId": 123,
  "startTime": "2024-06-01T09:00:00.000Z",
  "endTime": "2024-06-01T09:40:00.000Z",
  "duration": 2400, // in seconds
  "note": "string",
  "createdAt": "2024-06-01T09:00:00.000Z",
  "updatedAt": "2024-06-01T09:40:00.000Z"
}
```

**Errors:**
- 404 Not Found: No running timer found to stop.

---

### 3. Create Manual Entry

**POST** `/api/v1/projects/timer/manual-entry`

**Request Body:**
```json
{
  "taskId": 123,                           // Required - ID of the task
  "startTime": "2024-06-01T09:00:00.000Z", // Required - When work started
  "endTime": "2024-06-01T11:30:00.000Z",   // Required - When work ended
  "note": "string"                         // Optional - Note for this time entry
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "userId": 42,
  "taskId": 123,
  "startTime": "2024-06-01T09:00:00.000Z",
  "endTime": "2024-06-01T11:30:00.000Z",
  "duration": 9000, // in seconds (calculated automatically)
  "note": "string",
  "createdAt": "2024-06-01T12:00:00.000Z",
  "updatedAt": "2024-06-01T12:00:00.000Z"
}
```

**Errors:**
- 400 Bad Request: Missing required fields or invalid date format
- 400 Bad Request: End time must be after start time

---

### 4. Update Manual Entry

**PUT** `/api/v1/projects/timer/manual-entry/:entryId`

**Request Body:**
```json
{
  "taskId": 123,                           // Optional - New task ID
  "startTime": "2024-06-01T09:00:00.000Z", // Optional - New start time
  "endTime": "2024-06-01T11:30:00.000Z",   // Optional - New end time
  "note": "string"                         // Optional - New note
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "userId": 42,
  "taskId": 123,
  "startTime": "2024-06-01T09:00:00.000Z",
  "endTime": "2024-06-01T11:30:00.000Z",
  "duration": 9000, // in seconds (recalculated automatically)
  "note": "Updated note",
  "createdAt": "2024-06-01T12:00:00.000Z",
  "updatedAt": "2024-06-01T12:30:00.000Z"
}
```

**Errors:**
- 400 Bad Request: Invalid entry ID or invalid date format
- 400 Bad Request: End time must be after start time
- 404 Not Found: Time entry not found or not editable

---

### 5. Delete Manual Entry

**DELETE** `/api/v1/projects/timer/manual-entry/:entryId`

**Response (200 OK):**
```json
{
  "message": "Time entry deleted successfully"
}
```

**Errors:**
- 400 Bad Request: Invalid entry ID
- 404 Not Found: Time entry not found or not deletable

---

### 6. Get Timer Status

**GET** `/api/v1/projects/timer/status`

**Response (200 OK):**
```json
{
  "isRunning": true,
  "currentEntry": {
    "id": 1,
    "userId": 42,
    "taskId": 123,
    "startTime": "2024-06-01T09:00:00.000Z",
    "endTime": null,
    "duration": null,
    "note": "string",
    "createdAt": "2024-06-01T09:00:00.000Z",
    "updatedAt": "2024-06-01T09:00:00.000Z"
  },
  "totalToday": 5400,        // Total seconds tracked today
  "totalTodayHours": 1.5     // Total hours tracked today
}
```

---

### 7. Get Time Tracking Stats & Entries

**GET** `/api/v1/projects/timer/stats?userId=42&taskId=123&projectId=456`

**Query Parameters:**
- `userId` (required): ID of the user to get stats for
- `taskId` (optional): ID of the task to filter by
- `projectId` (optional): ID of the project to filter by

**Response (200 OK):**
```json
{
  "total": 5400,      // Total seconds tracked (all time, filtered)
  "today": 1800,      // Total seconds tracked today
  "thisWeek": 3600,   // Total seconds tracked this week
  "thisMonth": 5400,  // Total seconds tracked this month
  "entries": [
    {
      "id": 1,
      "startTime": "2024-06-01T09:00:00.000Z",
      "endTime": "2024-06-01T09:40:00.000Z",
      "duration": 2400,
      "note": "Morning session",
      "taskId": 123
    },
    {
      "id": 2,
      "startTime": "2024-06-01T14:00:00.000Z",
      "endTime": "2024-06-01T14:50:00.000Z",
      "duration": 3000,
      "note": "Afternoon session",
      "taskId": 123
    }
    // ...more entries
  ]
}
```

---

## Error Responses

**400 Bad Request**
```json
{
  "message": "Error message",
  "errors": ["Detailed error information"]
}
```

**404 Not Found**
```json
{
  "message": "Resource not found"
}
```

**409 Conflict**
```json
{
  "message": "Timer already running"
}
```

**500 Internal Server Error**
```json
{
  "message": "Internal server error"
}
```

---

## Notes

- All endpoints require authentication.
- All time values are in ISO 8601 format (UTC).
- Durations are in seconds.
- The `entries` array in `/stats` is ordered by `startTime` ascending.
- Manual entries automatically calculate duration from startTime and endTime.
- Only completed time entries (with endTime) can be edited or deleted.
- Users can only edit/delete their own time entries. 