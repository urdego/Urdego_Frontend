import { NextRequest } from 'next/server';
import { API_URL_CONFIG, API_BASE_URL } from '@/config/apiEndPointConfig';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  console.log('SSE Route Handler - Started');
  const userId = params.userId.replace('%40', '@');
  const sseUrl = `${API_BASE_URL.DNS}${API_URL_CONFIG.NOTIFICATION.SSE}${userId}`;
  console.log('SSE URL:', sseUrl);

  try {
    console.log('Attempting to connect to backend SSE');
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
          console.error('No response body received from backend');
          controller.close();
          return;
        }

        const reader = response.body.getReader();
        const textDecoder = new TextDecoder();
        const textEncoder = new TextEncoder();

        try {
          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              console.log('Stream complete');
              break;
            }

            const text = textDecoder.decode(value);
            console.log('Received data from backend:', text);

            // JSON 데이터를 SSE 형식으로 변환
            // SSE 프로토콜은 'data: ' 접두사와 '\n\n' 종결자를 필요로 함
            const sseMessage = `data: ${text}\n\n`;
            controller.enqueue(textEncoder.encode(sseMessage));
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
    return new Response('error: SSE connection failed\n\n', {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  }
}
