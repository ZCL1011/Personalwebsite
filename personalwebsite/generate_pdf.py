"""Generate clean PDF from resume.html using Edge headless mode."""
import subprocess, os

html_path = os.path.join(os.path.dirname(__file__), "resume.html")
pdf_path = os.path.join(os.path.dirname(__file__), "resume.pdf")

file_url = "file:///" + html_path.replace("\\", "/")

# Edge headless: --no-pdf-header-footer removes headers/footers
subprocess.run([
    "msedge",
    "--headless",
    "--disable-gpu",
    f"--print-to-pdf={pdf_path}",
    "--no-pdf-header-footer",
    file_url,
], check=True, timeout=30)

print(f"✅ 简历 PDF 已生成：{pdf_path}")
