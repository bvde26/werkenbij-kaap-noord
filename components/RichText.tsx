interface RichTextProps {
  text: string;
  color?: string;
  fontSize?: string;
  lineHeight?: string | number;
}

export default function RichText({ text, color = '#d4ecec', fontSize = '14px', lineHeight = '1.75' }: RichTextProps) {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let bulletBuffer: string[] = [];

  const flushBullets = (key: string) => {
    if (bulletBuffer.length === 0) return;
    elements.push(
      <ul key={key} style={{ margin: '6px 0', padding: 0, listStyle: 'none' }}>
        {bulletBuffer.map((b, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '4px', fontFamily: "'Kodchasan', sans-serif", fontSize, lineHeight, color }}>
            <span style={{ flexShrink: 0, marginTop: '2px' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    );
    bulletBuffer = [];
  };

  lines.forEach((line, i) => {
    if (line.startsWith('- ')) {
      bulletBuffer.push(line.slice(2));
    } else {
      flushBullets(`bullets-${i}`);
      if (line.trim() === '') {
        elements.push(<div key={i} style={{ height: '6px' }} />);
      } else {
        elements.push(
          <p key={i} style={{ margin: '0 0 4px', fontFamily: "'Kodchasan', sans-serif", fontSize, lineHeight, color }}>
            {line}
          </p>
        );
      }
    }
  });

  flushBullets('bullets-end');

  return <>{elements}</>;
}
