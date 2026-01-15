import express from 'express';

const app = express();
app.use(express.json());

// 이미지 URL 매핑
const images = {
  '5G요금제': 'https://github.com/tworldstore-admin/chatbot-images/blob/main/T%EC%9A%94%EA%B8%88%EC%A0%9C_5G.png?raw=true',
  '0청년요금제': 'https://github.com/tworldstore-admin/chatbot-images/blob/main/T%EC%9A%94%EA%B8%88%EC%A0%9C_0%EC%B2%AD%EB%85%84.png?raw=true',
  'LTE요금제': 'https://github.com/tworldstore-admin/chatbot-images/blob/main/T%EC%9A%94%EA%B8%88%EC%A0%9C_LTE.png?raw=true',
  '시니어요금제': 'https://github.com/tworldstore-admin/chatbot-images/blob/main/T%EC%9A%94%EA%B8%88%EC%A0%9C_%EC%8B%9C%EB%8B%88%EC%96%B4.png?raw=true',
  '어린이요금제': 'https://github.com/tworldstore-admin/chatbot-images/blob/main/T%EC%9A%94%EA%B8%88%EC%A0%9C_%EC%96%B4%EB%A6%B0%EC%9D%B4.png?raw=true'
};

// 스킬 엔드포인트
app.post('/api/image', (req, res) => {
  try {
    // 카카오에서 전달받은 파라미터
    const params = req.body.action?.params || {};
    const imageType = params.imageType;
    
    console.log('요청받은 이미지 타입:', imageType);
    
    // 이미지 URL 찾기
    const imageUrl = images[imageType];
    
    if (!imageUrl) {
      // 이미지 없을 경우
      return res.json({
        version: "2.0",
        template: {
          outputs: [
            {
              simpleText: {
                text: "요청하신 이미지를 찾을 수 없습니다.\n이미지 타입: " + imageType
              }
            }
          ]
        }
      });
    }
    
    // 이미지 응답
    res.json({
      version: "2.0",
      template: {
        outputs: [
          {
            simpleImage: {
              imageUrl: imageUrl,
              altText: imageType + " 안내"
            }
          }
        ]
      }
    });
    
  } catch (error) {
    console.error('에러 발생:', error);
    res.json({
      version: "2.0",
      template: {
        outputs: [
          {
            simpleText: {
              text: "오류가 발생했습니다. 잠시 후 다시 시도해주세요."
            }
          }
        ]
      }
    });
  }
});

// 헬스체크 (서버 작동 확인용)
app.get('/', (req, res) => {
  res.send('T-World 챗봇 스킬 서버 정상 작동 중');
});

app.get('/api/image', (req, res) => {
  res.send('이 URL은 POST 요청만 받습니다.');
});

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});

export default app;