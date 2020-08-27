const loggerMiddleware = store => next => action => {
    // 미들웨어 기본구조
    console.group(action && action.type); // 액션 타입으로 log를 그룹화
    console.log('이전상태', store.getState());
    console.log('액션', action);
    next(action); // 다음 미들웨어 혹은 리듀서에게 전달
    console.log('다음상태', store.getState()); // 업데이트된 상태
    console.groupEnd(); // 그룹 끝
}

// store는 리덕스 스토어 인스턴스
// action은 디스패치된 액션
// next 파라미터는 함수형태, store.dispatch와 비슷한 역할

export default loggerMiddleware;