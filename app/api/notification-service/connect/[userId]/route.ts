import { NextRequest } from 'next/server';
import { API_URL_CONFIG, API_BASE_URL } from '@/config/apiEndPointConfig';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  console.log('API Route - Received SSE request for user:', params.userId);

  const userId = params.userId.replace('%40', '@');
  const sseUrl = `${API_BASE_URL.DNS}${API_URL_CONFIG.NOTIFICATION.SSE}${userId}`;

  console.log('API Route - Forwarding to SSE URL:', sseUrl);

  try {
    const response = await fetch(sseUrl, {
      headers: {
        Accept: 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
      cache: 'no-store',
    });

    console.log('Backend Response Status:', response.status);
    console.log(
      'Backend Response Headers:',
      Object.fromEntries(response.headers)
    );

    if (!response.ok) {
      throw new Error(`SSE connection failed: ${response.status}`);
    }

    const stream = new ReadableStream({
      async start(controller) {
        if (!response.body) {
          console.error('API Route - No response body from backend');
          controller.close();
          return;
        }

        const reader = response.body.getReader();
        const textDecoder = new TextDecoder();

        try {
          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              console.log('API Route - Stream complete');
              break;
            }

            const text = textDecoder.decode(value, { stream: true });
            console.log('API Route - Received data:', text);
            controller.enqueue(new TextEncoder().encode(text));
          }
        } catch (error) {
          console.error('API Route - Stream reading error:', error);
        } finally {
          console.log('API Route - Closing stream');
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
    console.error('API Route - SSE Error:', error);
    return new Response('error: SSE connection failed\n\n', {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  }
}
