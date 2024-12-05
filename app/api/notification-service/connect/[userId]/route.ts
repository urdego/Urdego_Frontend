import { NextRequest } from 'next/server';
import { API_URL_CONFIG, API_BASE_URL } from '@/config/apiEndPointConfig';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  console.log('SSE Route Handler - Started');
  const userId = params.userId.replace('%40', '@');
  const sseUrl = `${API_BASE_URL.DNS}${API_URL_CONFIG.NOTIFICATION.SSE}${userId}`;

  try {
    const response = await fetch(sseUrl, {
      headers: {
        Accept: 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`SSE connection failed: ${response.status}`);
    }

    const stream = new ReadableStream({
      async start(controller) {
        if (!response.body) {
          console.error('No response body received from backend');
          controller.close();
          return;
        }

        const reader = response.body.getReader();
        const textDecoder = new TextDecoder();
        const textEncoder = new TextEncoder();
        let buffer = '';

        try {
          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              console.log('Stream complete');
              break;
            }

            buffer += textDecoder.decode(value, { stream: true });

            const messages = buffer.split('\n\n');
            buffer = messages.pop() || '';

            for (const message of messages) {
              if (message.trim()) {
                const formattedMessage = formatSSEMessage(message);
                controller.enqueue(textEncoder.encode(formattedMessage));
              }
            }
          }
        } catch (error) {
          console.error('Error while reading stream:', error);
        } finally {
          reader.releaseLock();
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('SSE Route Handler - Error:', error);
    return new Response('event: error\ndata: SSE connection failed\n\n', {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  }
}

function formatSSEMessage(message: string): string {
  if (!message.trim()) return '';

  if (message.startsWith('data: ') || message.startsWith('event: ')) {
    return message + '\n\n';
  }

  try {
    const parsed = JSON.parse(message);
    return `data: ${JSON.stringify(parsed)}\n\n`;
  } catch {
    return `data: ${message}\n\n`;
  }
}
