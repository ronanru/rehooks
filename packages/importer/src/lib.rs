mod hook;
use hook::Hook;
use regex::Regex;
use std::convert::TryInto;
use std::fs::{self, OpenOptions};
use std::io::Write;
use std::path::Path;

pub fn import_hooks_from_src(src_dir: &str) -> Result<Vec<Hook>, String> {
    let mut hooks = Vec::new();

    let mut entries: Vec<_> = fs::read_dir(src_dir)
        .map_err(|e| e.to_string())?
        .filter_map(Result::ok)
        .collect();

    entries.sort_by_key(|entry| entry.file_name());

    for (id, entry) in entries.iter().enumerate() {
        let path = entry.path();

        if path.is_dir() {
            let title = path
                .file_name()
                .and_then(|name| name.to_str())
                .ok_or("Invalid directory name")?
                .to_string();

            let index_path = path.join("index.ts");
            if index_path.exists() {
                let content = fs::read_to_string(index_path).map_err(|e| e.to_string())?;
                let description = extract_description(&content)?;

                hooks.push(Hook {
                    id: id.try_into().unwrap(),
                    title,
                    content,
                    description,
                });
            }
        }
    }

    Ok(hooks)
}

fn extract_description(content: &str) -> Result<String, String> {
    let re = Regex::new(r#"const description\s*=\s*"([^"]+)";"#).map_err(|e| e.to_string())?;
    if let Some(captures) = re.captures(content) {
        Ok(captures[1].to_string())
    } else {
        Err("No description found for the hook".to_string())
    }
}

fn ensure_directory_exists(path: &Path) -> Result<(), String> {
    if let Some(parent) = path.parent() {
        fs::create_dir_all(parent).map_err(|e| e.to_string())?;
    }
    Ok(())
}

pub fn write_hooks_to_json(hooks: Vec<Hook>, output_path: &str) -> Result<(), String> {
    let json_content = serde_json::to_string_pretty(&hooks).map_err(|e| e.to_string())?;
    let output_path = Path::new(output_path);
    ensure_directory_exists(output_path)?;

    let mut file = OpenOptions::new()
        .write(true)
        .create(true)
        .truncate(true)
        .open(output_path)
        .map_err(|e| e.to_string())?;

    file.write_all(json_content.as_bytes())
        .map_err(|e| e.to_string())?;

    Ok(())
}
