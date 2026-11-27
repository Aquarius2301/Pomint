use serde::Deserialize;
use tauri_plugin_notification::NotificationExt;

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct NotificationPayload {
    pub title: String,
    pub body: String,
}

#[tauri::command]
pub fn notify(app: tauri::AppHandle, payload:NotificationPayload) -> Result<(), String> {
    app.notification()
        .builder()
        .title(payload.title)
        .body(payload.body)
        .show()
        .map_err(|error| error.to_string())
}