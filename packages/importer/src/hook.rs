use serde::Serialize;

#[derive(Serialize)]
pub struct Hook {
    pub id: u32,
    pub title: String,
    pub description: String,
    pub content: String,
}
