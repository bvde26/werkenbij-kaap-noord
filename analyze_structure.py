import re

with open('/Users/bram/Desktop/kaap-noord/public/original.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

# Extract all headings
headings = re.findall(r'<h([1-6])([^>]*)>([^<]+)</h\1>', html)
print("=== SITE STRUCTURE ===\n")
for level, attrs, text in headings:
    indent = "  " * (int(level) - 1)
    print(f"{indent}H{level}: {text.strip()[:70]}")

# Extract key sections
print("\n=== MAIN SECTIONS (by class) ===")
section_classes = {}
sections = re.findall(r'<(section|div)[^>]*class="([^"]*)"[^>]*>', html)
for tag, classes in sections:
    for cls in classes.split():
        if len(cls) > 3 and not cls.startswith('wp-'):
            if cls not in section_classes:
                section_classes[cls] = 0
            section_classes[cls] += 1

for cls, count in sorted(section_classes.items(), key=lambda x: x[1], reverse=True)[:15]:
    print(f"  • {cls}: {count}x")

# Extract buttons/CTAs
print("\n=== CTA BUTTONS ===")
buttons = re.findall(r'<a[^>]*class="[^"]*btn[^"]*"[^>]*>([^<]+)</a>', html)
for btn in set(buttons):
    if btn.strip() and len(btn.strip()) > 2:
        print(f"  • {btn.strip()[:50]}")

# Extract footer content
print("\n=== FOOTER CONTENT ===")
footer = re.search(r'<footer[^>]*>(.*?)</footer>', html, re.DOTALL)
if footer:
    # Get all text in footer
    footer_text = re.sub(r'<[^>]+>', '', footer.group(1))
    lines = [line.strip() for line in footer_text.split('\n') if line.strip() and len(line.strip()) > 3]
    for line in lines[:15]:
        print(f"  • {line[:60]}")

# Extract menu items
print("\n=== MENU ITEMS ===")
menu = re.findall(r'<a[^>]*class="[^"]*menu[^"]*"[^>]*>([^<]+)</a>', html)
for item in menu[:10]:
    print(f"  • {item.strip()}")

print(f"\nTotal HTML size: {len(html) / 1024:.1f} KB")
print(f"Total headings: {len(headings)}")
