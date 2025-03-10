async function analyzeCode(code) {
    const response = await fetch('http://localhost:3001/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });
  
    if (!response.ok) {
      try {
        const text = await response.text();
        if (text) {
          try {
            const errorData = JSON.parse(text);
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
          } catch (jsonError) {
            throw new Error(`HTTP error! status: ${response.status}, invalid json response`);
          }
        } else {
          throw new Error(`HTTP error! status: ${response.status}, empty response body`);
        }
      } catch (error) {
        if (error instanceof SyntaxError) {
          throw new Error(`HTTP error! status: ${response.status}, invalid json response`);
        } else {
          throw new Error(`HTTP error! status: ${response.status}, unknown error`);
        }
      }
    }
  
    const data = await response.json();
    return data;
  }
  
  // Example usage:
  const codeToAnalyze = `#include <stdio.h>\nint main() {\n  int x = 10;\n  printf("%d\\n", x);\n  return 0;\n}`;
  analyzeCode(codeToAnalyze);