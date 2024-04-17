/**  http 클라이언트 클래스
 * 코드의 재사용성과 유지보수를 용이하게 하기 위한 클래스
 * 중앙 집중식 관리: 일관된 요청 처리 방식을 제공합니다.
 * 재사용성: fetch 메소드를 통해 다양한 서비스에서 재사용 가능합니다.
 * 에러 처리: 네트워크 요청 시 발생할 수 있는 에러를 일관된 방식으로 처리합니다.
 * 유연성: 요청에 필요한 기본 옵션을 설정하고, 필요에 따라 변경할 수 있습니다.
 */
export default class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async fetch(url, options) {
    // 사용자에서 전달받은 url(path)와 options를 fetch로 호출하고, 응답이 정상적이면 json으로 변환하여 반환
    const res = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    // body가 있을 경우 json으로 변환하여 data에 저장 (없을 경우 undefined)
    // body가 없을경우 json 변환을 시도하면 에러가 발생하므로 try-catch로 처리
    let data;
    try {
      data = await res.json();
    } catch (error) {
      console.error(error);
    }

    // 2000대 정상 응답일 경우 data 반환, 아닐 경우 에러 발생
    if (res.status > 299 || res.status < 200) {
      const message =
        data.message && data.message ? data.message : "Something went wrong";
      throw new Error(message);
    }
    return data;
  }
}
