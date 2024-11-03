#[derive(Debug)]
pub struct HookHealth {
    pub title: String,
    pub is_healthy: bool,
    pub issues: Vec<String>,
}

pub fn check_hook_health(hook_code: &str, title: &str) -> HookHealth {
    let mut issues = Vec::new();

    if !hook_code.contains("const description") {
        issues.push("Missing constant description".to_string());
    }

    if !hook_code.contains("export function") {
        issues.push("No exported functions found".to_string());
    }

    HookHealth {
        title: title.to_string(),
        is_healthy: issues.is_empty(),
        issues,
    }
}

pub fn report_health(mut health_reports: Vec<HookHealth>) {
    health_reports.sort_by(|a, b| a.title.cmp(&b.title));

    for health in health_reports {
        println!("Hook: {}", health.title);
        println!(
            "Status: {}",
            if health.is_healthy {
                "Healthy"
            } else {
                "Unhealthy"
            }
        );
        if !health.is_healthy {
            println!("Issues: {:?}", health.issues);
        }
        println!("-------------------------");
    }
}
